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
  
  const [cryptopunk420, setcryptopun420] = useState({
    tokenAddress: "",
    tokenId: "",
    type: "",
  });


  //토큰 하드코딩
  const CRYPTOPUNK_420 = {
    tokenAddress: "0x5ecf874ab5476e1a1a3a06d4436af99345336615",
    tokenId: "1",
    type: "ERC721",
  };
  const CRYPTOPUNK_421 = {
    tokenAddress: "0xc3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA", // erc20 컨트렉트
    amount: "69000000",
    type: "ERC20",
  };

  const walletAddressUserA = account;
  const assetsToSwapUserA = [CRYPTOPUNK_420];
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

  console.log(cryptopunk420);
  // console.log(CRYPTOPUNK_420);
  useEffect(() => {
    console.log(active);
    if (active) {
      const sdk = new NftSwap(library, library.getSigner(), chainId);
      setSwapSdk(sdk);
      console.log(sdk);
    }
  }, [library, chainId]);

  // Use the SDK however you'd like in the app...
  const handleClick = useCallback(() => {
    const fetchData = async () => {
      if (!swapSdk) {
        return;
      }
      await swapSdk.approveTokenOrNftByAsset(CRYPTOPUNK_420, walletAddressUserA);
      // 승인과정
      // Part One
      console.log(walletAddressUserB);
      const order = await swapSdk.buildOrder(
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
      //signeOrder에 정보 확인 거래 정보
      console.log("ttsignt", signedOrder);
      setSignedOrder(signedOrder);

      // Part 2
    };
    fetchData();
  }, [swapSdk]);

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

        <select id="type" value={cryptopunk420.type} onChange={tokenInfoChange}>
          <option value="ERC20">ERC20</option>
          <option value="ERC721">ERC721</option>
        </select>

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

        <select id="type">
          <option value="ERC20">ERC20</option>
          <option value="ERC721">ERC721</option>
        </select>

        <div>
          <label for="fname">Walletaddress : </label>
          <input type="text" id="tokenAddress" />
        </div>

        <div>
          <label for="fname">Token Address : </label>
          <input type="text" id="tokenAddress" />
        </div>

        <div>
          <label for="lname">Amount : </label>
          <input type="text" id="tokenId" />
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------------------------------------------------- */}

      <div id="submit">
        <button type="button" onClick={handleClick}>
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
