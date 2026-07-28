
import json
import os
from typing import cast

from dotenv import load_dotenv
from exa_py import Exa
from firecrawl import Firecrawl

from app.core.models import groq, deepseek
from app.core.prompts import draft_prompt
from app.core.schemas import DocState, Section, DocPlan
from langgraph.types import Command

load_dotenv()



async def plan_node(state : DocState):
    """plan the document layout and structure based on doctype"""

    response  = cast( 
        DocPlan,
        deepseek.with_structured_output(DocPlan).invoke( 
            input=f"""
                Create a {state.docType} document plan based on APA academic documents standards.
                your document are supposed to be able to satisfy the question below:
                qn : {state.question}
                Rules :
                    - Dont Include Page realted structure like title page
                    - The instructions field of the sections should also inlude instructions to the agent that will generate the plan
                    - do not return the content field.
            """,
        )
    ) 
    state.title = response.title
    state.sections.extend(response.sections)
    return state

async def ref_node(state : DocState):
    """ route to the text node based on the the presence of refferences"""
    if state.refs:
        go2 = "rag"
    else:
        go2 = "withoutRef" 

    # gotta return a command to the path assigned to go2
    return(Command(goto=go2))

async def rag_node(state: DocState):
    """Generate  a recusive RAG on the attached refferences"""
     
    return state

async def without_ref_draft_node(state : DocState):
    "plan the document layout and structure based on doctype"

    for section in state.sections:
        response = deepseek.invoke( 
            input=f"""
                You are writing a {state.docType} document that answers the question below.
                The document is titled: "{state.title}"
    
                Question: {state.question}
    
                Now write the following section:
                Section Title: {section.title}
                Instructions: {section.instructions}
    
                Write thorough, formal academic content for this section.
                Use APA formatting standards appropriate for a {state.docType}.
                Reference the provided sources where relevant with proper APA in-text citations.
                Write in paragraph form — do not use bullet points or numbered lists
                unless explicitly requested in the instructions.
                Maintain an authoritative, academic tone throughout.
            """,
        )
        section.content = cast(str, response.content)
    return state

async def with_ref_draft_node(state : DocState):
    "plan the document layout and structure based on doctype"
    # ouput should be the first drafts for sections 
    # response = deepseek.invoke( 
    #     input=f"""
    #         Create a ${state.docType} document plan based on APA academic documents standards.
    #         your document are supposed to be able to satisfy the question below:
    #         qn : ${state.question}
    #     """,
    # )
    return state













# async def research_node(state: DocState):

#     llm_extraction_strategy = LLMExtractionStrategy(
#         llm_config=LLMConfig(
#             base_url="https://api.deepseek.com",
#             provider="deepseek/deepseek-chat",
#             api_token=os.getenv("DEEPSEEK_API_KEY"),
#         ),
#         extraction_type="schema",
#         instruction="Extract a detailed lead report from the company website. provide as much info as posiible in the profile field ",
#         chunk_token_threshold=1200,
#         overlap_rate=0.1,
#         apply_chunking=True,
#         input_format="fit_markdown",
#         verbose=True,
#     )

#     config = CrawlerRunConfig(extraction_strategy=llm_extraction_strategy)

#     for lead in state.leads:
#         if not lead.url:
#             state.leads.remove(lead)
#             continue

#         async with AsyncWebCrawler() as crawler:
#             results = await crawler.arun(lead.url, config=config)

#             if results.extracted_content:
#                 data = _parse_extracted_content(results.extracted_content)
#                 lead.name = data.get("name", lead.name)
#                 lead.email = data.get("email", lead.email)
#                 lead.profile = data.get("profile", lead.profile)

#             # if landing page doesn't contain an email
#             if not lead.email:
#                 # First pass: look for a mailto: link
#                 for v in results.links.values():
#                     for link in v:
#                         href = link.get("href", "")
#                         if "mailto:" in href:
#                             lead.email = href.replace("mailto:", "")
#                             break
#                     if lead.email:
#                         break

#                 # Second pass: if still no email, find a contact page and scrape it
#                 if lead.email == "":
#                     for v in results.links.values():
#                         for link in v:
#                             href = link.get("href", "")
#                             if "contact" in href:
#                                 contact_results = await crawler.arun(
#                                     href, config=config
#                                 )
#                                 if (
#                                     contact_results
#                                     and contact_results.extracted_content
#                                 ):
#                                     data = _parse_extracted_content(
#                                         contact_results.extracted_content
#                                     )
#                                     lead.email = data.get("email", lead.email)
#                                 if lead.email:
#                                     break
#                         if lead.email:
#                             break

#     for lead in state.leads:
#         if not lead.email:
#             response = cast(
#                 ProfileData,
#                 profileDataRetrieverModel.invoke(
#                     [
#                         {
#                             "role": "user",
#                             "content": f"""analyze the lead company profile below and extract the details
#                             lead_profile: {lead.profile}""",
#                         }
#                     ]
#                 ),
#             )

#             if response:
#                 lead.email = response.email
#                 # lead.location = response.location