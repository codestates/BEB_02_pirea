import { useWeb3React } from "@web3-react/core";
import { useState, useEffect, useCallback } from "react";
import { injected } from "./Connector";
import { isNoEthereumObject } from "./Errors";



export default function Createswap() {
  const { library, chainId, activate, active, deactivate, account } = useWeb3React();
//   const [account, setAccount] = useState('');
  

  const handleConnect = () => {
    if (active) {
        console.log(account);
      deactivate();
      return;
    }
    activate(injected, (error) => {
      if (isNoEthereumObject(error))
        window.open("https://metamask.io/download.html");
    });
    
};
  return (
    <div>
      <div>
        <p>Createswap</p>
        <button type="button" onClick={handleConnect}>
          {active ? "disconnect" : "connect"}
        </button>
      </div>

      <div>
        <label for="fname">Token Address : </label>
        <input type="text" id="Tokenaddress" name="fname" />
      </div>

      <div>
        <label for="lname">Token ID : </label>
        <input type="text" id="Tokenid" name="lname" />
      </div>

      <div>
        <label for="lname">My Wallet Address : </label>
        <input type="text" id="Walletaddress" name="lname" value={account} />
      </div>

      <div>
        <input type="submit" value="Submit" />
      </div>
    </div>
  );
}
