from pydantic import BaseModel

# answer sections
# will be used for both staging during planning and updated with final content after research
class Sections(BaseModel):
    title: str
    content: str


class Ans(BaseModel):
    title: str
    sectors: list[Sections]


# fastdoc state
class DocState(BaseModel):
    docID: str
    docType: str
    question: str
    refs: list[str] | None = None
    answer: Ans | None
