from sqlalchemy.orm import Session
from sqlalchemy import func
from model.models import SwapSign
from model.models import SwapSignNum


def create_swap(db: Session, sign: dict, haveForm: dict, wantForm: dict):


    exist = db.query(db.query(SwapSignNum).filter(SwapSignNum.address == sign["makerAddress"]).exists()).scalar()

    if exist:
         
        db.query(SwapSignNum).filter(SwapSignNum.address == sign["makerAddress"]).update({'num': SwapSignNum.num + 1})
        db.commit()
        swap_num_row = db.query(SwapSignNum).filter(SwapSignNum.address == sign["makerAddress"]).first()
        num = swap_num_row.__dict__['num']

    else:
        num = 1
        swapNumQuery =SwapSignNum(address=sign["makerAddress"], num=1)
        db.add(swapNumQuery)
        db.commit()
        db.refresh(swapNumQuery)

    swapcode = sign["makerAddress"] + str(num)
    row_swap = SwapSign(swapcode=swapcode, sign=sign, haveForm=haveForm, wantForm=wantForm)

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
