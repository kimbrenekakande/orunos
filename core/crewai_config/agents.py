from crewai import Agent


class AgentsAll():
    def analyzer(self):
        return Agent(
            role="Question Analyzer",
            goal="Conduct thorough research on given topics",
            backstory="""You are an experienced researcher with a keen eye for detail.
            You excel at gathering information from various sources and synthesizing it into
            comprehensive reports.""",
            verbose=True
        )
    
    def research_expert(self):
        return Agent(
            role="Research Expert",
            goal="Conduct thorough research on given topics",
            backstory="""You are an experienced researcher with a keen eye for detail.
            You excel at gathering information from various sources and synthesizing it into
            comprehensive reports.""",
            verbose=True
        )

    def writer(self):
        return Agent(
            role="Writer",
            goal="Conduct thorough research on given topics",
            backstory="""You are an experienced researcher with a keen eye for detail.
            You excel at gathering information from various sources and synthesizing it into
            comprehensive reports.""",
            verbose=True
        )
    
    def editor(self):
        return Agent(
            role="Editor",
            goal="Conduct thorough research on given topics",
            backstory="""You are an experienced researcher with a keen eye for detail.
            You excel at gathering information from various sources and synthesizing it into
            comprehensive reports.""",
            verbose=True
        )