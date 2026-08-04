
from pydantic import BaseModel

# answer sections
# will be used for both staging during planning and updated with final content after research
class Section(BaseModel):
    title: str
    instructions : str
    content: str | None = None

# fastdoc state
class DocState(BaseModel):
    docID: str
    docType: str
    title : str | None = None
    question: str
    refs: list[str] | None = None
    sections : list[Section] = []

class DocPlan(BaseModel):
    title : str
    sections : list[Section]