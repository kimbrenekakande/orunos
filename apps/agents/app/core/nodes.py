import json
import os
from typing import cast

from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, LLMConfig, LLMExtractionStrategy
from dotenv import load_dotenv
from exa_py import Exa
from firecrawl import Firecrawl

from app.core.models import groq, profileDataRetrieverModel, deepseek
from app.core.prompts import draft_prompt
from app.core.schemas import (
    CompanyReport,
    ProfileData,
    SearchResult,
    emailReq,
    # leadReq,
    leadsSearchState,
)
from lib.extraction import ProfileDataExtraction

load_dotenv()


async def search_node(state: leadsSearchState):
    exa = Exa(api_key=os.getenv("EXA_API_KEY"))

    results = exa.search_and_contents(
        query=f"Generate Leads of  companies or organizations in the the {state.industry} industry of {state.country}",
        exclude_domains=state.exclude,
        category="company",
        num_results=100,
        type="deep",
    )

    for r in results.results:
        state.leads.append(
            SearchResult(id=None, name=r.title, url=r.url, profile=r.text)
        )

    if results.results:
        print("Exa Generation Completed")

    return state


async def analyze_node(state: leadsSearchState):

    firecrawl_api_key = os.getenv("FIRECRAWL_API_KEY")
    if firecrawl_api_key is None:
        raise ValueError("FIRECRAWL_API_KEY environment variable is not set")
    firecraw = Firecrawl(api_key=firecrawl_api_key)

    for lead in list(state.leads):
        if lead.url and lead.profile:
            get_data: ProfileData = await ProfileDataExtraction(profile=lead.profile)
            
            if get_data.email:
                lead.email = get_data.email
            if get_data.location:
                lead.location = get_data.location

        try:
            if not lead.email and lead.url:
                data = firecraw.scrape(lead.url, formats=["markdown"])
                lead.profile = data.markdown

                if lead.profile:
                    response: ProfileData = await ProfileDataExtraction(profile=lead.profile)
                    if response.email:
                        lead.email = response.email
                    if response.location:
                        lead.location = response.location
        except Exception as e:
            print(
                f"[analyze_node] Failed to extract data for {lead.name} ({lead.url}): {e}"
            )

        if not lead.email or "@" not in lead.email:
            state.leads.remove(lead)


def _parse_extracted_content(extracted_content):
    """Parse crawled extracted_content (a JSON string) into a dict.

    When chunking is enabled, the JSON string may contain a list of results
    (one per chunk) — this takes the first element.
    """
    parsed = json.loads(extracted_content)
    if isinstance(parsed, list):
        return parsed[0] if parsed else {}
    return parsed


async def research_node(state: leadsSearchState):

    llm_extraction_strategy = LLMExtractionStrategy(
        llm_config=LLMConfig(
            base_url="https://api.deepseek.com",
            provider="deepseek/deepseek-chat",
            api_token=os.getenv("DEEPSEEK_API_KEY"),
        ),
        schema=CompanyReport.model_json_schema(),
        extraction_type="schema",
        instruction="Extract a detailed lead report from the company website. provide as much info as posiible in the profile field ",
        chunk_token_threshold=1200,
        overlap_rate=0.1,
        apply_chunking=True,
        input_format="fit_markdown",
        verbose=True,
    )

    config = CrawlerRunConfig(extraction_strategy=llm_extraction_strategy)

    for lead in state.leads:
        if not lead.url:
            state.leads.remove(lead)
            continue

        async with AsyncWebCrawler() as crawler:
            results = await crawler.arun(lead.url, config=config)

            if results.extracted_content:
                data = _parse_extracted_content(results.extracted_content)
                lead.name = data.get("name", lead.name)
                lead.email = data.get("email", lead.email)
                lead.profile = data.get("profile", lead.profile)

            # if landing page doesn't contain an email
            if not lead.email:
                # First pass: look for a mailto: link
                for v in results.links.values():
                    for link in v:
                        href = link.get("href", "")
                        if "mailto:" in href:
                            lead.email = href.replace("mailto:", "")
                            break
                    if lead.email:
                        break

                # Second pass: if still no email, find a contact page and scrape it
                if lead.email == "":
                    for v in results.links.values():
                        for link in v:
                            href = link.get("href", "")
                            if "contact" in href:
                                contact_results = await crawler.arun(
                                    href, config=config
                                )
                                if (
                                    contact_results
                                    and contact_results.extracted_content
                                ):
                                    data = _parse_extracted_content(
                                        contact_results.extracted_content
                                    )
                                    lead.email = data.get("email", lead.email)
                                if lead.email:
                                    break
                        if lead.email:
                            break

    for lead in state.leads:
        if not lead.email:
            response = cast(
                ProfileData,
                profileDataRetrieverModel.invoke(
                    [
                        {
                            "role": "user",
                            "content": f"""analyze the lead company profile below and extract the details
                            lead_profile: {lead.profile}""",
                        }
                    ]
                ),
            )

            if response:
                lead.email = response.email
                lead.location = response.location


async def draft_node(state: emailReq):
    mktCorp = {
        "name": "Eagle Info Solutions",
        "website": "www.eagleinfosolutions.com",
        "email": "info@eagleinfosolutions.com",
        "location": "Nalubega complex, Room L28. Opp Watoto Churh",
        "services": "Eagle Info Solutions is a computer retail and repair company dedicated to providing top-notch technology solutions to various industries.",
    }
    for company in state.companies:

        
        response = deepseek.invoke( input=draft_prompt(mktCorp, company))
        company.draft = response.text
    return state
