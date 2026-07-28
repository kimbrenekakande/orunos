from fastapi import APIRouter

from app.agents.fastdocs import graph
from app.core.models import groq
from app.core.schemas import DocState

router = APIRouter(prefix="/api/v1", tags=["Emails"])


@router.post("/deep")
async def get_emails(body):
    return 
