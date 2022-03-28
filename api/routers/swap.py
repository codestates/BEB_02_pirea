from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from crud.crud_swap import *
from database.db import get_db
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/api/v0.1/swap"
)

class Data(BaseModel):
    order: str
    address: str

@router.post("/create", tags=["swap"])
async def get_swap_recent(info: Request, db: Session =Depends(get_db)):
    req_info = await info.json()
    print(req_info['order'])

    swap_code = create_swap(db, req_info['address'], req_info['order'], req_info["haveForm"], req_info["wantForm"])

    return swap_code


@router.get("/get", tags=["swap"]) 
async def get_swap_code(swapcode: str, db: Session=Depends(get_db)):
    signcode = get_swapcode_sign(db=db, swapcode=swapcode)

    return signcode

@router.get("/get/all", tags=["swap"])
async def get_swap_all(db: Session=Depends(get_db), more: int = 1):
    sign_all = get_swapcode_recent_all(db, more)
    return sign_all
