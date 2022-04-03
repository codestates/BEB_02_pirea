from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/v0.1/analytics"
)


@router.get("/", description="return statistics", tags=["analytics"])
async def get_analytics():
    """
    Active
    NewClient
    Spend month
    Recent Swap
    Today Site User
    """
