import { useWeb3React } from "@web3-react/core";
import { NftSwap } from "@traderxyz/nft-swap-sdk";
import { useState, useEffect, useCallback } from "react";
import { injected } from "./Connector";
import { isNoEthereumObject } from "./Errors";
import "./Createswap.css";

export default function Createswap() {
  const { library, chainId, activate, active, deactivate, account } =
    useWeb3React();
  const [swapSdk, setSwapSdk] = useState(null);
  const [signOrder, setSignedOrder] = useState("");
  //   const [account, setAccount] = useState('');
  
  
  const [address, setAddress] = useState("");
  const [cryptopunk420, setcryptopun420] = useState(
    {
    tokenAddress: '',
    tokenId: '',
    type: '',
  });

  
  const [cryptopunk421, setcryptopun421] = useState({
    tokenAddress: '',
    amount: '',
    type: '',
  });


  //토큰 하드코딩
  const CRYPTOPUNK_420 = {
    tokenAddress: "0x5ECF874ab5476E1A1A3A06d4436AF99345336615",
    tokenId: "4",
    type: "ERC721",
  };
  const CRYPTOPUNK_421 = {
    tokenAddress: "0xc3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA", // erc20 컨트렉트
    amount: "69000000",
    type: "ERC20",
  };

  const walletAddressUserA = account;
  const assetsToSwapUserA = [cryptopunk420];
  console.log(walletAddressUserA);
  const walletAddressUserB = "0x8FE3836c1bbf6943c8393707de067CA8795E30Fd";
  
  // const walletAddressUserB = '0x8772901ea06D450C18A92a53927Ba63EFcC97Dbe';
  const assetsToSwapUserB = [CRYPTOPUNK_421];
  // const assetsToSwapUserB = [CRYPTOPUNK_421];

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

  const tokenInfoChange = (e) => {
    setcryptopun420((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const tokenInfoChange1 = (e) => {
    setcryptopun421((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const addressChange = (e) => {
    setAddress(e.target.value);
  }
  
  console.log(CRYPTOPUNK_420);
  console.log(cryptopunk420);
  console.log(cryptopunk421);
  console.log(address);


  useEffect(() => {
    console.log(active);
    if (active) {
      const sdk = new NftSwap(library, library.getSigner(), chainId);
      setSwapSdk(sdk);
      console.log(sdk);
    }
  }, [library, chainId]);

  // Use the SDK however you'd like in the app...
  const handleClick = async(cryptopunk420) => {



    console.log(`handle`,cryptopunk420);


    
      if (!swapSdk) {
        return;
      }
      console.log(`before`,window.localStorage.getItem("cryptopunk"))
      swapSdk.approveTokenOrNftByAsset(cryptopunk420, walletAddressUserA);
      // 승인과정
      // Part One
      console.log(walletAddressUserB);
      const order =  swapSdk.buildOrder(
        assetsToSwapUserA,
        assetsToSwapUserB,
        walletAddressUserA, // 서명서 과정
        {
          fees: [
            {
              amount: "6900000000000", // 69 USDC fee
            },
          ],
        }
      );
      const signedOrder = await swapSdk.signOrder(order, walletAddressUserB); // 서명서에 사인
      console.log(`signedOrder`,signedOrder);

      fetch("http://localhost:4999/user", { //text 주소에서 받을 예정
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({test: account, sign: signedOrder}), //textbox라는 객체를 보냄

    })
    .then((res) => res.json()) 
    .then((json) => {
      console.log(json);
      this.setState({
        text: json.text,
      });
    });


      //signeOrder에 정보 확인 거래 정보
      console.log("ttsignt", signedOrder);
      setSignedOrder(signedOrder);

      // Part 2
    
    
  }

  const handleClick2 = useCallback(() => {
    const fetchData2 = async () => {
      if (!swapSdk) {
        return;
      }

      // Part 2
    
    await swapSdk.approveTokenOrNftByAsset(CRYPTOPUNK_421, walletAddressUserB); // 승인과정


    const fillTx = await swapSdk.fillSignedOrder(signOrder);  // 사인
    console.log("fill", fillTx);
    const fillTxReceipt = await swapSdk.awaitTransactionHash(fillTx.hash); //rinkbynet 에 요청 fillTx 트랜잭션에 뿌림
    // console.log(fillTxReceipt.transactionHash);
    console.log(fillTxReceipt.transactionHash); // 영수증

    }
    fetchData2();

  }, [swapSdk])

  return (
    <div>
      <div>
        <p>Createswap</p>
      </div>

      <div>
        <div id="connectBox">
          <button type="button" onClick={handleConnect}>
            {active ? "disconnect" : "connect"}
          </button>

          <input type="text" id="Walletaddress" name="lname" value={account} />
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------------------------------------------------- */}

      <div class="swap">
        <div>
          <p>have</p>
        </div>

        <input
          type="text"
          id="type"
          value={cryptopunk420.type}
          onChange={tokenInfoChange}
        />
        {/* <select id="type" value={cryptopunk420.type} onChange={tokenInfoChange}>
          <option value="ERC20">ERC20</option>
          <option value="ERC721">ERC721</option>
        </select> */}

        <div>
          <label for="fname">Token Address : </label>
          <input
            type="text"
            id="tokenAddress"
            value={cryptopunk420.tokenAddress}
            onChange={tokenInfoChange}
          />
        </div>

        <div>
          <label for="lname">Token ID : </label>
          <input
            type="text"
            id="tokenId"
            value={cryptopunk420.tokenId}
            onChange={tokenInfoChange}
          />
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------------------------------------------------- */}

      <div class="swap">
        <div>
          <p>want</p>
        </div>

        <select
          id="type"
          value={cryptopunk421.type}
          onChange={tokenInfoChange1}
        >
          <option value="ERC20">ERC20</option>
          <option value="ERC721">ERC721</option>
        </select>

        <div>
          <label for="fname">Token Address : </label>
          <input
            type="text"
            id="tokenAddress"
            value={cryptopunk421.tokenAddress}
            onChange={tokenInfoChange1}
          />
        </div>

        <div>
          <label for="lname">Amount : </label>
          <input
            type="text"
            id="amount"
            value={cryptopunk421.amount}
            onChange={tokenInfoChange1}
          />
        </div>

        <div>
          <label for="fname">Walletaddress : </label>
          <input type="text" id="tokenAddress" onChange={addressChange} />
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------------------------------------------------- */}

      <div id="submit">
        <button type="button" onClick={() => handleClick(cryptopunk420)}>
          {" "}
          Submit
        </button>{" "}
        <button type="button" onClick={handleClick2}>
          {" "}
          swap
        </button>
      </div>
    </div>
  );
}
