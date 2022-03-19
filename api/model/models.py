from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON, Date
from sqlalchemy.orm import relationship
from sqlalchemy import MetaData
from database.db import Base, engine

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(255), nullable=False)
    wallet = Column(String(255), nullable=False)
    nickname = Column(String(255), nullable=False)
    token = Column(String(255), nullable=False)

class SwapSign(Base):
    __tablename__ = "swap"
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(255), nullable=False)
    swapcode = Column(String(255), nullable=False)
    sign = Column(JSON, nullable=False)

class RecentSwapCode(Base):
    __tablename__ = "recentswap"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    address = Column(String(255), nullable=False)

class Analytics(Base):
    __tablename__ = "analytics"
    date = Column(Date, primary_key=True, index=True)
    newclient = Column(Integer, nullable=False) 
    todaysiteuser = Column(Integer, nullable=False)
    spentmonth = Column(Integer, nullable=False)

