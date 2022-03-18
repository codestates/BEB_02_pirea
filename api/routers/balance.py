from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel

router = APIRouter (
    prefix="/api/v0.1/balance"
)

