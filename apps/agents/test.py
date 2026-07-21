import os
import dotenv
from exa_py import Exa


dotenv.load_dotenv()


query = "Generate Leads of  companies or organizations in the the service industry of uganda"
exa = Exa(api_key=os.getenv("EXA_API_KEY"))

results = exa.search_and_contents(
    query = "eagle  info solutions uganda",
    exclude_domains=["eagleinfosolutions.com", "mercurycomputerslimited.com"],
    category="company",
    num_results=10,
    type="deep",
)

if results.results:
    print(results)
    with open("results.json", "w") as f:
        import json
        f.write(json.dumps([result.__dict__ for result in results.results], indent=2))