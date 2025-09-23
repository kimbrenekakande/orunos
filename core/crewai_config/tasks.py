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
               - Proper heading hierarchy (h1 for title, h2 for main sections, h3 for subsections)
               - Well-structured paragraphs with <p> tags
               - Proper spacing between sections using CSS margin/padding
               - Ordered and unordered lists where appropriate
               - Blockquotes for important quotes or excerpts
               - Proper citation formatting
               - Clean, readable typography
            4. Ensure academic integrity and proper citations
            5. Maintain university coursework essay standards and structure
            
            HTML Formatting Guidelines:
            - Wrap the entire content in a <div class="essay">
            - Use proper heading hierarchy
            - Add appropriate spacing between sections
            - Ensure all text is properly wrapped in <p> tags
            - Use <strong> for important terms, not <b>
            - Use <em> for emphasis, not <i>
            - Include a proper title in an <h1> at the top
            - Add section headers with <h2> and <h3> as needed
            - Format lists with <ul> or <ol> with <li> items
            - Add appropriate classes for styling (e.g., <p class="introduction">)""",
            expected_output="""A polished final response in clean HTML that includes:
            1. Proper HTML5 document structure
            2. Semantic HTML elements
            3. Well-formatted headings and paragraphs
            4. Properly formatted lists and blockquotes
            5. Clean, maintainable code with appropriate spacing
            6. Properly formatted citations and references
            
            Example structure:
            <div class="essay">
                <h1>Essay Title</h1>
                <p class="introduction">Introduction text...</p>
                <h2>Section Title</h2>
                <p>Body text...</p>
                <h3>Subsection</h3>
                <p>More detailed content...</p>
                <ul>
                    <li>List item 1</li>
                    <li>List item 2</li>
                </ul>
                <blockquote>Important quote or excerpt</blockquote>
                <h2>Conclusion</h2>
                <p>Concluding remarks...</p>
            </div>""",
            agent=agent,
            verbose=True,
            output_file="editor_output.html"
        )