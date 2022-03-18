import erc721Abi from "./erc721CreateAbi";
import { create } from "ipfs-http-client";
import Axios from "axios";
import Web3 from "web3";
import React from "react"; 
import { useEffect, useState } from "react";

function Create() {

  //초기변수값을 만들자
  const [address, setAddress] = useState('');
  const [FileUrl, setFileUrl] = useState(``);
  const [FileImage, setFileImage] = useState(``);
  const [FileIPFSUrl, setFileIPFSUrl] = useState("");
  const [web3, setWeb3] = useState();
  const [title, setTitle] = useState(``);
  const [coordinateX, setCoordinateX] = useState(``);
  const [coordinateY, setCoordinateY] = useState(``);
  const [fileDesc, setFileDesc] = useState(``);
  // const account = window.localStorage.getItem("account");


  // metamask web3
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

    //지갑연결
  const connectWallet = async () => {
    let account = await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    setAddress(account[0]);
};
    //이미지 등록 & 화면에 등록이미지 보여주기
  const client = create("https://ipfs.infura.io:5001/api/v0");
    async function onChange(e) {
          const file = e.target.files[0];
          console.log("file", e);
          console.log("file", file);
          // setFileUrl(file); 
          // setFileUrl();
          setFileUrl(URL.createObjectURL(file));
          console.log("URLfile", URL.createObjectURL(file));
          setFileImage(URL.createObjectURL(file));
	  }
    
    // 컨트랙트 주소 , Abi 받아서 민팅하기
    const mint = async () => {
      const contractAddress = "0xac05D1638122Eb47BD44D77581583e155a4511D7";
      const tokenContract = await new web3.eth.Contract(
        erc721Abi, contractAddress
      );

    // 업로드한 이미지를 blob형태로바꿔서 받는다. cid1 준비
    const file1 = await Axios
    .get(FileUrl, {responseType: "blob"})
    .then(response => {
      return response.data;
    }); 
    // 이미지 cid = cidOfImage
    const cidOfImage = await client.add(file1);
    const image_url = `https://ipfs.infura.io/ipfs/${cidOfImage.path}`;
    console.log("63줄CID오브이미지", image_url);

    //metadata생성 x,y좌표값 , 이미지, 타이틀, 설명
    let metadata = {
      image : image_url,
      X : setCoordinateX,
      Y : setCoordinateY,
      title : setTitle,
      description : setFileDesc
    };
    // Remix에서 transaction 할 때 넣는 cid같은거 2번 cid
    let cidOfMetadata;
    cidOfMetadata = await client.add(JSON.stringify(metadata));
    console.log("76line CID메타데이터", cidOfMetadata);
    const metadata_URL = `https://ipfs.infura.io/ipfs/${cidOfMetadata.path}`;
    console.log("metadata", metadata);

    try {
      var result = await tokenContract.methods.mintNFT(address, metadata_URL, coordinateX, coordinateY).send({
        from : address,
        gasLimit : 5000000,
        value : 0,
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    console.log(metadata);
    console.log("민트를 눌렀다?", tokenContract);
  };

    
    return (
      <div className="test">

            <button
                className="metaConnect"
                onClick={() => {
                    connectWallet();
                }}
            >
                connect to MetaMask
            </button>
            <div className="userInfo">주소: {address}</div>
        
        <div>Image</div>
        
        <input type="file" accept="image/*" onChange={onChange}></input>
        <img src={FileImage} alt="Image"/>

          <div>Title</div>
          <input type="text" onChange={(e) => {
            setTitle(e.target.value);
          }}></input>

            <div>Desc</div>
          <input type="text" onChange={(e) => {
            setFileDesc(e.target.value);
          }}></input>

            <div>X</div>
          <input type="text" onChange={(e) => {
            setCoordinateX(e.target.value);
          }}></input>

          <div>Y</div>
          <input type="text" onChange={(e) => {
            setCoordinateY(e.target.value);
          }}></input>
          
            <button 
            className="minting"
            onClick={() => {
              mint();
            }}
            >
              민팅
            </button>

      </div>

    )

}
export default Create;