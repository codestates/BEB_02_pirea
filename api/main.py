from typing import Optional
from fastapi import FastAPI, Depends, Path, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db, engine, Base
from model import models
from pydantic import BaseModel
from routers import user, analytics, swap, nft_token
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="pirea api",
    version="0.1.0"
)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://192.168.0.3:3000",
    "http:/192.168.0.3:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(items.router)
app.include_router(user.router)
app.include_router(analytics.router)
app.include_router(swap.router)
app.include_router(nft_token.router)

app = FastAPI(
    title="pirea api",
    version="0.1.0"
)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://192.168.0.3:3000",
    "http:/192.168.0.3:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(items.router)
app.include_router(user.router)
app.include_router(analytics.router)
app.include_router(swap.router)
app.include_router(nft_token.router)

# TODO: divide the router path
# TODO: Active Token, New Clients, Spent month, Recent Swap, Balance, Site User

"""
Active, 한달기준 활성화되는 NFT Token
New client, 기존에 없던 주소가 요청이 되는 New Client
Spent month, 한달 기준 사용된 erc20
Recent Swap, 최근 교환된 내역
Today Site User 오늘 사이트 유저

POST: data create
GET: data read
PUT: data update
DELETE: data delete
"""

@app.get("/")
def read_root():
    return {"hello": "World"}
