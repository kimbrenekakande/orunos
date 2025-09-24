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
            description="""Review, refine and format the response to ensure it fully answers the {question} and is properly formatted in HTML
            
            Your tasks:
            1. Ensure the content is accurate and complete
            2. Check for clarity and coherence
            3. Format the entire document in clean, semantic HTML with:
                - Proper heading hierarchy (h1 for title, h2 for main sections, h3 for subsections) | should be natively created for ckeditor5 WYSIWYG editor
                - Well-structured paragraphs with <p> tags | should be natively created for ckeditor5 WYSIWYG editor
                - Proper spacing between sections using CSS margin/padding | should be natively created for ckeditor5 WYSIWYG editor
                - Ordered and unordered lists where appropriate | should be natively created for ckeditor5 WYSIWYG editor
                - Blockquotes for important quotes or excerpts | should be natively created for ckeditor5 WYSIWYG editor
                - Proper citation formatting | should be natively created for ckeditor5 WYSIWYG editor
                - Clean, readable typography
            4. Ensure academic integrity and proper citations
            5. Maintain university coursework essay standards and structure
            
            HTML Formatting Guidelines:
            - should be natively created for ckeditor5 WYSIWYG editor
            - should be semantic HTML
            """,
            expected_output="""
            Format the entire document in clean, semantic HTML with:
                - Proper heading hierarchy (h1 for title, h2 for main sections, h3 for subsections) | should be natively created for ckeditor5 WYSIWYG editor
                - Well-structured paragraphs with <p> tags | should be natively created for ckeditor5 WYSIWYG editor
                - Proper spacing between sections using CSS margin/padding | should be natively created for ckeditor5 WYSIWYG editor
                - Ordered and unordered lists where appropriate | should be natively created for ckeditor5 WYSIWYG editor
                - Blockquotes for important quotes or excerpts | should be natively created for ckeditor5 WYSIWYG editor
                - Proper citation formatting | should be natively created for ckeditor5 WYSIWYG editor
                - Clean, readable typography
                -academic integrity and proper citations
                -university coursework essay standards and structure
            """,
            agent=agent,
            verbose=True,
        )