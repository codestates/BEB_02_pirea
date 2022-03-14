import { useWeb3React } from "@web3-react/core";
import { NftSwap } from "@traderxyz/nft-swap-sdk";
import { useState, useEffect, useCallback } from "react";
import { injected } from "./Connector";
import { isNoEthereumObject } from "./Errors";

export default function Createswap() {
  const { library, chainId, activate, active, deactivate, account } =
    useWeb3React();
  const [swapSdk, setSwapSdk] = useState(null);
  const [signOrder, setSignedOrder] = useState("");
  //   const [account, setAccount] = useState('');

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
  const walletAddressUserA =  account;
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
      await swapSdk.approveTokenOrNftByAsset(
        CRYPTOPUNK_420,
        walletAddressUserA
      );
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
        <button type="button" onClick={handleClick}>
          {" "}
          Submit
        </button>{" "}
      </div>
    </div>
  );
}
