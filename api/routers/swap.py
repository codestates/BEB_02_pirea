from fastapi import APIRouter


router = APIRouter(
    prefix="/api/v0.1/swap"
)


@router.get("/get", tags=["swap"])
async def get_swap_recent():
    return {}

