from fastapi import APIRouter, Depends, HTTPException
from enum import Enum
from typing import Optional
from pydantic import BaseModel
import web3
from web3_token import Web3Token 
from database.db import get_db
from sqlalchemy.orm import Session
from model.models import Users



"""
wallet
"""
router = APIRouter(
    prefix="/api/v0.1/users"
)

class WalletType(str, Enum):
    metamask = "metamask"
    kaikas = "kaikas"


class Item(BaseModel):
    name: str
    description: Optional[str] = None
    tax: Optional[float] = None

class Data(BaseModel):
    token: str

@router.get("/wallet/login", tags=["wallet"])
async def login_wallet(token: str, address: str, db: Session = Depends(get_db)):
    token_p = Web3Token(token)
    signer = token_p.get_signer(validate=True)
    stmt = db.query(Users).where(Users.id == 1)
    statement = token_p.get_data()


    if address == signer:
        return True

    return False

@router.get("/wallet/type/{model}", tags=["wallet"], description="get wallet type by address token")
async def get_wallet_type(wallet: WalletType, token: str, address:str):
    return {}

@router.post("/wallet/type/add", tags=["wallet"]) 
async def set_wallet(wallet: str,  toekn: str, address: str):
    return {}

@router.put("/wallet/type/revise", tags=["wallet"])
async def revise_wallet(wallet: WalletType, token: str, address: str):
    return {}


