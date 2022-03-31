from sqlalchemy.orm import Session
from model.models import SmarContractorAbi
from urllib.request import urlopen
import os, json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_FILE = os.path.join(BASE_DIR, "config", "web3_secrets.json")
SECRET_FILE_JSON = json.loads(open(SECRET_FILE).read())
SECRET_FILE_WEB3 = SECRET_FILE_JSON["web3"]

async def get_create_abi(db: Session, cont_address: str):
    
    exist = db.query(db.query(SmarContractorAbi).filter(SmarContractorAbi.contractAddress == cont_address).exists()).scalar()
    print(exist)

    if exist:
        return db.query(SmarContractorAbi).filter(SmarContractorAbi.contractAddress == cont_address).first()
    else:
        request_url = f"https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address={cont_address}&apikey={SECRET_FILE_WEB3['ETHER_SCAN_API_TOKEN']}"
        print(abi)
        res = await urlopen(request_url)
        res_utf = res.read().decode("utf-8")
        json_res_utf = json.loads(res_utf)
        abi = json_res_utf.get('result')

        if (abi =="Contract source code not verified") :
            print("hello")
        else:
            abi_row = SmarContractorAbi(contractAddress=cont_address, abijson=abi)
            db.add(abi_row)
            db.commit()
            db.refresh(abi_row)
            return  abi_row


