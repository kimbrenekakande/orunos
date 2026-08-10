from fastapi import APIRouter, HTTPException, status

from app.agents.fastdocs import graph
from app.core.schemas import DocState

router = APIRouter(prefix="/api/v1", tags=["Generation"])


@router.post("/fast", response_model=DocState, status_code=status.HTTP_201_CREATED)
async def fast_gen(body:  DocState):
    initial_state: DocState = DocState(
        docID = body.docID,
        docType = body.docType,
        question =body.question
    )

    if initial_state : 
        x = await graph.ainvoke(initial_state)
        return x
        
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="There is an Error during the graph exection")
