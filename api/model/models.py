from sqlalchemy import Column, Integer, String, LargeBinary,JSON, Date
from database.db import Base
import datetime

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(255), nullable=False)
    wallet = Column(String(255), nullable=False)
    nickname = Column(String(255), nullable=False)
    token = Column(LargeBinary, nullable=False)

class SwapSign(Base):
    __tablename__ = "swapsign"
    id = Column(Integer, primary_key=True, index=True)
    swapcode = Column(String(255), nullable=False)
    haveForm = Column(JSON, nullable=False)
    wantForm = Column(JSON, nullable=False)
    sign = Column(JSON, nullable=False)

class SwapSignNum(Base):
    __tablename__ = "swapsignnum"
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(255), nullable=False)
    num = Column(Integer, nullable=False)
    

class RecentSwapCode(Base):
    __tablename__ = "recentswap"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    address = Column(String(255), nullable=False)

class Analytics(Base):
    __tablename__ = "analytics"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    date = Column(Date, primary_key=True, default=datetime.datetime.today().strftime('%Y-%m-%d'))
    newclient = Column(Integer, nullable=False) 
    todaysiteuser = Column(Integer, nullable=False)
    spentmonth = Column(Integer, nullable=False)

class SmarContractorAbi(Base):
    __tablename__ = "abi"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    contractAddress = Column(String(255), nullable=False)
    abijson = Column(JSON, nullable=False)
