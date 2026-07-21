from fastapi import APIRouter

from app.agents.mailer import graph
from app.core.models import groq
from app.core.schemas import emailReq

router = APIRouter(prefix="/api/v1", tags=["Emails"])


@router.post("/email")
async def get_emails(body: emailReq):
    mail_list = body.companies
    initial_State: emailReq = emailReq(companies=mail_list)
    request = await graph.ainvoke(initial_State)
    return request


@router.get("/email/test")
async def call_llm():
    call = groq.invoke(input="what is afrofuturism")
    return call.text
