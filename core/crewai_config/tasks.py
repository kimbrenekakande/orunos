from crewai import Task

class TasksAll():
    def analysis_task(self, agent):
        return Task(
            description="""Research the latest developments in AI agents and multi-agent systems.
            Focus on recent breakthroughs, key players, and future trends.
            Provide a comprehensive summary of your findings.""",
            expected_output="""A detailed research report covering:
            1. Recent breakthroughs in AI agents
            2. Key companies and researchers in the field
            3. Current challenges and limitations
            4. Future trends and predictions""",
            agent=agent,
            verbose=True,
        )

    def research_task(self, agent):
        return Task(
            description="""Research the current state of the Artificial Intelligence (AI) industry.
            Analyze the market trends, emerging technologies, and key players.
            Provide a comprehensive overview of your findings.""",
            expected_output="""A detailed research report covering:
            1. Market trends in AI
            2. Emerging technologies
            3. Key players and their contributions
            4. Outlook and future prospects""",
            agent=agent,
            verbose=True,
        )

    def draft_write_task(self, agent):
        return Task(
            description="""Research the potential applications of AI in various industries.
            Identify areas where AI can bring significant value and impact.
            Provide a detailed analysis of your findings.""",
            expected_output="""A research report covering:
            1. Applications of AI in different industries
            2. Potential impact and benefits
            3. Challenges and limitations
            4. Future outlook and potential adoption""",
            agent=agent,
            verbose=True,
        )

    def editor_task(self, agent):
        return Task(
            description="""Research the ethical and societal implications of AI.
            Analyze the impact of AI on privacy, security, and fairness.
            Provide a comprehensive analysis of your findings.""",
            expected_output="""A detailed research report covering:
            1. Ethical and societal implications of AI
            2. Impact on privacy and security
            3. Fairness and transparency
            4. Future considerations and recommendations""",
            agent=agent,
            verbose=True,
        )