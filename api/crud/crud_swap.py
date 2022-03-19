from sqlalchemy.orm import Session
from model.models import SwapSign

def create_swap(db: Session, address: str, sign: dict):
    row_swap = SwapSign(address=address, swapcode="123", sign=sign)
    db.add(row_swap)
    db.commit()
    db.refresh(row_swap)

    return "hello"

def get_swapcode_sign(db: Session,  swapcode: str):
    sign_code = db.query(SwapSign).filter(SwapSign.swapcode == swapcode).all()

    return sign_code
