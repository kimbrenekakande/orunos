from crewai import Crew
from .tasks import TasksAll
from .agents import AgentsAll
from dotenv import load_dotenv

load_dotenv()

agents = AgentsAll()
tasks = TasksAll()

#agents
analyzer = agents.analyzer()
research_expert = agents.research_expert()
editor = agents.editor()
writer = agents.writer()

#tasks
analysis_task = tasks.analysis_task(analyzer)
research_task = tasks.research_task(research_expert)
draft_write_task = tasks.draft_write_task(writer)
editor_task = tasks.editor_task(editor)


#crew
crew = Crew(
    name="Coursework Crew",
    agents=[analyzer, research_expert, writer, editor],
    tasks=[analysis_task, research_task, draft_write_task, editor_task],
    verbose=True,
)

# coursework_question = input("Enter your question: ")


# input = {
#     "coursework_question": coursework_question,
# }

# result = crew.kickoff(input)
# print(result)