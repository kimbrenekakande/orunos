import os

from dotenv import load_dotenv
from fastapi import Request
from fastapi.responses import JSONResponse

load_dotenv()
API_KEY = os.getenv("SECRET_KEY")


async def authentication(request: Request, call_next):
    if request.url.path == "/health":
        return await call_next(request)

    token = request.headers.get("x-api-key")
    if not token or token != API_KEY:
        return JSONResponse(
            status_code=401, content={"detail": "Invalid or missing API key"}
        )

    response = await call_next(request)
    return response
