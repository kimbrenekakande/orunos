from fastapi import APIRouter

from app.agents.fastdocs import graph
from app.core.schemas import DocState

router = APIRouter(prefix="/api/v1", tags=["Generation"])


@router.post("/fast")
async def get_leads(body:  DocState):
    initial_state: DocState = DocState(
        docID = body.docID,
        docType = body.docType,
        question =body.question
    )
    x = await graph.ainvoke(initial_state)

    return x
