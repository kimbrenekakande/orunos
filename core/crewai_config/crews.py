from crewai import Crew
from tasks import TasksAll
from agents import AgentsAll
from dotenv import load_dotenv

load_dotenv()

agents = AgentsAll()
tasks = TasksAll()

#agents
analyzer = agents.analyzer()
researcher = agents.researcher()
editor = agents.editor()
writer = agents.writer()

#tasks
analysis_task = tasks.analysis_task(analyzer)
research_task = tasks.research_task(researcher)
write_task = tasks.write_task(writer)
editor_task = tasks.editor_task(editor)


#crew

def get_crew(input):
    return Crew(
    name="Coursework Crew",
    agents=[analyzer, researcher, writer, editor],
    tasks=[analysis_task, research_task, write_task, editor_task],
    verbose=True,
)


result = get_crew(input={"question": "What is the impact of afrofuturism to the non black community"}).kickoff()
print(result)