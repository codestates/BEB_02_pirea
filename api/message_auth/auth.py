from web3.auto  import w3
import base64
import json
from typing import Dict
import eth_account.messages
import base64

class Web3Token:
    def __init__(self, token: str):
        self.json_data = json.loads(base64.b64decode(token))
        self.signature = self.json_data['signature']
        self.body_parts = self.json_data['body'].split('\n\n')
        self.message = self.body_parts[-1]
        self.statement = self.body_parts[0] if len(self.body_parts) > 1 else None
        self.__body_hash = None
        self.__signer = None

    @property
    def body(self) -> str:
        if self.statement is not None:
            return self.json_data['body'] 
        return self.message

    @property
    def body_hash(self) -> bytes:
        if self.__body_hash is None:
            self.__body_hash = eth_account.messages.defunct_hash_message(
                text = self.body
            )
        return self.__body_hash

    def get_signer(self, validate: bool = True) -> str:
        if self.__signer is None:
            signer = w3.eth.account.recoverHash(
                self.body_hash,
                signature = self.signature
            )
            if validate and not w3.isAddress(signer):
                raise Exception(f'Invalid Token')
            self.__signer = signer
        return self.__signer

    def get_data(self) -> Dict[str, str]:
        return dict(
            map(
                lambda s: s.split(': '),
                self.message.split('\n')
            )
        )




if __name__ == '__main__':
    token_ = 'eyJzaWduYXR1cmUiOiIweGEyZDUzNGNiOWM0NDAyN2M1MzY1M2QwMWFhNWQzMjQ3ZTUxYjY2MmZhZmUwOTYzZDAwYjg4ZTEyYjZkZDgyYTg2MjhjYWFkNzIyM2M2ODYzZmMzZjA5NjM5MWI2ODkwNWZlNzBmZWFjMjFlOWZiMGNlNTRhZDk1MzE5YmI3YWMzMWMiLCJib2R5IjoibGFuZG5mdC5jb20gd2FudHMgeW91IHRvIHNpZ24gaW4gd2l0aCB5b3VyIEV0aGVyZXVtIGFjY291bnQuXG5cbmxvZ2luIGluIHBpcmVhXG5cblVSSTogaHR0cDovLzE5Mi4xNjguMC4zOjMwMDAvZGFzaGJvYXJkXG5XZWIzIFRva2VuIFZlcnNpb246IDJcbk5vbmNlOiA3MTI5ODUwNVxuSXNzdWVkIEF0OiAyMDIyLTAzLTE5VDE2OjI2OjA0LjYyOFpcbkV4cGlyYXRpb24gVGltZTogMjAyMi0wMy0yMFQxNjoyNjowNC4wMDBaIn0='
    a = Web3Token(token_)
    # a.test()
    # print(a.body)
    print(a.get_signer())
