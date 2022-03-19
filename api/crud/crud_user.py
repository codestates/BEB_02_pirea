from sqlalchemy.orm import Session
from model.models import Users

# if address exists, return True
def get_exists_user(db: Session, address: str):
    return db.query(db.query(Users).filter(Users.address == address).exists()).scalar()

def get_user(db: Session, address: str):
    return db.query(Users).filter(Users.address == address).first()

def create_user(db: Session, address: str, wallet: str, nickname: str, token: str):
    user_row = Users(address=address, wallet=wallet, nickname=nickname, token=token)
    db.add(user_row)
    db.commit()
    db.refresh(user_row)
    return user_row


