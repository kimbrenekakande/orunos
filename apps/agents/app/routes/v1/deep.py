from fastapi import APIRouter

router = APIRouter(prefix="/api/v1", tags=["Generation"])


@router.post("/deep")
async def deep_gen(body):
    return 
