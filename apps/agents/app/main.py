from fastapi import FastAPI
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from app.middleware.auth import authentication
from app.routes.v1 import emails, leads

load_dotenv()

@asynccontextmanager
async def spinup_actions(app:FastAPI):
    yield

app = FastAPI(lifespan=spinup_actions)
app.middleware("http")(authentication)
app.include_router(leads.router)
app.include_router(emails.router)

