from crewai import Task

class TasksAll():
    def analysis_task(self, agent):
        return Task(
            description="""Analyze the {question} coursework question
            
            Your task is to:
            1. Identify the key components and requirements to answer the {question}
            2. Determine the scope and depth needed
            3. Break down complex questions into manageable parts""",
            expected_output="""A structured analysis including:
            1. Main topic and key concepts
            2. Required components of the answer
            3. Recommended approach for research""",
            agent=agent,
            verbose=True,
        )

    def research_task(self, agent):
        return Task(
            description="""Using the {question} analysis, research information needed to answer the {question}
            
            Focus on:
            1. Finding relevant and credible sources
            2. Extracting key information and data
            3. Identifying important facts and evidence""",
            expected_output="""A research document containing:
            1. Key findings from sources
            2. Supporting evidence
            3. Proper citations and references""",
            agent=agent,
            verbose=True,
        )

    def write_task(self, agent):
        return Task(
            description="""Using the research and {question} analysis, draft a comprehensive university coursework essay to answer the {question}
            
            Ensure your response:
            1. Directly addresses all parts of the question
            2. Is well-structured and logical
            3. Includes relevant evidence and examples""",
            expected_output="""A well-structured response that includes:
            1. Clear introduction
            2. Well-organized body with evidence
            3. Proper citations
            4. Conclusion summarizing key points""",
            agent=agent,
            verbose=True,
        )

    def editor_task(self, agent):
        return Task(
            description="""Review and refine the response to ensure it fully answers the {question}
            
            Check for:
            1. Accuracy and completeness
            2. Clarity and coherence
            3. Proper formatting and style
            4. Grammar and spelling
            5. Academic integrity and citations
            6. University coursework essay standards and structure""",
            expected_output="""A polished final response that is:
            1. Accurate and complete
            2. Clear and well-structured
            3. Properly formatted
            4. Free of errors""",
            agent=agent,
            verbose=True,
            output_file="editor_output.md"
        )