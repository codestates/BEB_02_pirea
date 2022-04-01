from sqlalchemy.orm import Session
from sqlalchemy import func
from model.models import SwapSign

def create_swap(db: Session, address: str, sign: dict, haveForm: dict, wantForm: dict):
    row_swaps = db.query(SwapSign).filter(SwapSign.makerAddress == address).count()
    swapcode = address + str(row_swaps+1)
    row_swap = SwapSign(makerAddress=address, swapcode=swapcode, sign=sign, haveForm=haveForm, wantForm=wantForm)

    db.add(row_swap)
    db.commit()
    db.refresh(row_swap)

    return swapcode


def get_swapcode_sign(db: Session,  swapcode: str):
    sign_code = db.query(SwapSign).filter(SwapSign.swapcode == swapcode).first()

    return sign_code

# return swapcode recent all 
def get_swapcode_recent_all(db: Session, more: int):
    
    if more == 1 :    
        minNum = 1
        maxNum =  more * 20
    else:
        minNum = 20 * more
        maxNum = (more + 1) * 20
    

    lineNum = db.query(SwapSign).count()
    minNum =  minNum - lineNum 
    maxNum = maxNum - lineNum
    sign_code_all = db.query(SwapSign).filter(maxNum >= SwapSign.id, SwapSign.id >= minNum).all()

    return sign_code_all

