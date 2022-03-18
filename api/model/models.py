from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import MetaData
from database.db import Base, engine



class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    nickname = Column(String(255), nullable=False)

    


