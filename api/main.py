from typing import Optional
from fastapi import FastAPI, Depends, Path, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db, engine, Base
from model import models
from pydantic import BaseModel
app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"hello": "World"}

@app.get("/item/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.get(path="/api/v1/users/{user_id}")
def get_place(
    place_id: int,
    db: Session = Depends(get_db)):
    result = db.query(models.Users).filter(models.Users.id == place_id).first()


    print(place_id)
    if result is None:
        raise HTTPException(status_code=404, detail="ID에 해당하는 User가 없습니다.")

    return {
        "status": "OK",
        "data": result
    }
    

class ReUsers(BaseModel):
    __tablename__ = "users"

    username: str
    password: str 
    nickname: str 

    class Config:
        orm_mode =True
    

@app.post(path="/api/v1/users/add")
async def register_user(req: ReUsers, db: Session = Depends(get_db)):
    me = models.Users(**req.dict())
    db.add(me)
    db.commit()
    return me
