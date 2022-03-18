from fastapi import Depends, Path, HTTPException, APIRouter

router = APIRouter(
    prefix="/api/v0.1/users/token"
)

@router.get("/balance", description="get balance", tags=["token"])
async def get_balance():
    return ()

@router.put("/balance/add", description="add balance", tags=["token"])
async def add_balance():
    return {}

@router.get("/month", description="get month active token", tags=["token"])
async def get_active_month_token():
    return {}

@router.put("/get/", tags=["token"])
async def spend_token():
    return {}
