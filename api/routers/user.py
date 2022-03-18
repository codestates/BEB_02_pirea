from fastapi import APIRouter, Depends, HTTPException
from enum import Enum
from typing import Optional
from pydantic import BaseModel



"""
wallet
"""
router = APIRouter(
    prefix="/api/v0.1/users"
)

class ModelName(str, Enum):
    metamask = "metamask"
    kaikas = "kaikas"

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: ModelName
    tax: Optional[float] = None


@router.get("/wallet/type/{model}", tags=["wallet"], description="get wallet type by address token")
async def get_wallet_type(wallet: ModelName, token: str, address:str):
    return {}

@router.post("/wallet/type/add", tags=["wallet"]) 
async def set_wallet(wallet: str,  toekn: str, address: str):
    return {}

@router.put("/wallet/type/revise", tags=["wallet"])
async def revise_wallet(wallet: ModelName, token: str):
    return {}

@router.get("/wallet/login/{info}", tags=["wallet"])
async def login_wallet():
    return {}
