from fastapi import APIRouter

from app.agents.finder import graph
from app.core.schemas import leadReq, leadsSearchState

router = APIRouter(prefix="/api/v1", tags=["Leads"])


@router.post("/lead")
async def get_leads(body: leadReq):

    initial_state: leadsSearchState = leadsSearchState(
        industry=body.industry,
        country=body.country,
        exclude=body.exclude,
        leads=[],
    )
    x = await graph.ainvoke(initial_state)

    return x
