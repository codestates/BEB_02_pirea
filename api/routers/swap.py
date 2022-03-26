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
    create_swap(db, req_info['address'], req_info['order'])

    return {}
