from sqlalchemy.orm import Session
from model.models import Analytics
import datetime

def exists_today_analytics(db: Session):    
    return db.query(db.query(Analytics).filter(Analytics.date == datetime.datetime.today().strftime("%Y-%m-%d")).exists()).scalar()

def create_today_analytics(db: Session):
    Analytics(newclient=0, todaysites=0, spendmonth=0)
    db.add(Analytics)
    db.commit()

    return db.query(Analytics).all()

def get_analytics_today(db: Session):
    return db.query(Analytics).filter(Analytics.date == datetime.datetime.today().strftime("%Y-%m-%d"))

def add_newclient_analytics(db: Session):
    db.query(Analytics).filter(Analytics.date == datetime.datetime.today().strftime("%Y-%m-%d")).update({'newclient': Analytics.newclient+1})
    db.commit()
    db.refresh(Analytics)

def add_todaysiteuser_analytics(db: Session):
    db.query(Analytics).filter(Analytics.date == datetime.datetime.today().strftime("%Y-%m-%d")).update({'todaysiteuser': Analytics.todaysiteuser+1})
    db.commit()
    db.refresh(Analytics)

def spentmonth(db: Session, spent: int):
    db.query(Analytics).filter(Analytics.date == datetime.datetime.today().strftime("%Y-%m-%d")).update({'spentmonth': Analytics.spentmonth+ spent})
