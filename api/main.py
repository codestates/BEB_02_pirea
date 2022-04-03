from typing import Optional
from fastapi import FastAPI, Depends, Path, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql.schema import MetaData
from database.db import get_db, engine, Base
from model import models
from pydantic import BaseModel
from routers import user, analytics, swap, nft_token
from fastapi.middleware.cors import CORSMiddleware


# TODO: API 받아서, ABI 받아오고 TOKEN URL 받아오기.
# TODO: JSON API SECRET FILE 만들기...

Base.metadata.create_all(engine)



tags_metadata = [
    {
        "name": "analytics",
        "description": "user statistics"
    },
    {
        "name": "swap",
        "description": "When swapping, users exchange swapcode, register sign code, and receive API",
    },
    {
        "name": "wallet",
        "description": "If the user registers the wallet used by the user, the api to continuously send requests to the wallet"
    }
]


app = FastAPI(
    title="pirea api",
    version="0.1.0",
    terms_of_service="https://github.com/codestates/BEB_02_pirea/blob/main/CodeOfConduct.md",
    contact= {
        "name": "pirea",
        "url": "https://github.com/codestates/BEB_02_pirea"
    },
    license_info={
        "name": "MIT",
        "url": "https://github.com/codestates/BEB_02_pirea/blob/main/LICENSE"
    },
    openapi_tags=tags_metadata,
    docs_url="/docs",
    redoc_url="/redoc"
)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:3000",
    "http://192.168.0.1:3000",
    "http://192.168.0.1:3001",
    "http://192.168.0.3:3000",
    "http:/192.168.0.3:8000"
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
# app.include_router(nft_token.router)

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
