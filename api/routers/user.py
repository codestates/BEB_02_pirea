from fastapi import APIRouter, Depends, HTTPException
from enum import Enum
from typing import Optional
from pydantic import BaseModel
from crud.crud_user import *
from crud.crud_swap import *
from web3_token import Web3Token 
from database.db import get_db
from sqlalchemy.orm import Session
from model.models import *
from fastapi.encoders import jsonable_encoder

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
async def login_wallet(token: str, address: str, wallet: str, nickname:str ,db: Session = Depends(get_db)):
    token_p = Web3Token(token)
    signer = token_p.get_signer(validate=True)

    if address == signer:
        if get_exists_user(db, signer):
            return get_user(db, signer) 
        else:
            create_user(db, address, wallet, nickname, token)
            return get_user(db, signer)
    else:
        raise HTTPException(status_code=404, detail="Fobbiden")


@router.get("/test")
async def test(db: Session = Depends(get_db), swapc = ""):
    # a = jsonable_encoder({'a': '1'})
    # create_swap(db, address="test", sign=a)
    print(get_user(db, "test"))
    print(type(get_user(db, "test")))

    # return  get_swapcode_sign(db, swapc)

@router.get("/wallet/type/{model}", tags=["wallet"], description="get wallet type by address token")
async def get_wallet_type(wallet: WalletType, token: str, address:str):
    return {}

@router.post("/wallet/type/add", tags=["wallet"]) 
async def set_wallet(wallet: str,  toekn: str, address: str):
    return {}

@router.put("/wallet/type/revise", tags=["wallet"])
async def revise_wallet(wallet: WalletType, token: str, address: str):
    return {}
