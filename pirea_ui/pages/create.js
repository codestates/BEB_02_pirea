import erc721Abi from "../../erc721_create";
import Axios from "axios";
import Web3 from "web3";
import { create } from "ipfs-http-client";
import React, { useEffect, useState } from "react";

function Create() {

  //초기변수값을 만들자
  const [FileUrl, setFileUrl] = useState(``);
  const [FileIPFSUrl, setFileIPFSUrl] = useState("");
  const [web3, setWeb3] = useState();
  const [title, setTitle] = useState(``);
  const [coordinateX, setCoordinateX] = useState(``);
  const [coordinateY, setCoordinateY] = useState(``);
  const [fileDesc, setFileDesc] = useState(``);
  const account = window.localStorage.getItem("account");


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
  
  const client = create("https://ipfs.infura.io:5001/api/v0");
    async function onChange(e) {
          const file = e.target.files[0];
          console.log(e);
          setUserFileUrl(file);
          console.log(file.path)
	  }
    
    const addImage = async addedImages => {
      setFileUrl(URL.createObjectURL(addedImages[0]));
    }
    // 컨트랙트 주소 , Abi 받아서 민팅하기
    const mint = async () => {
      const contractAddress = "0xac05D1638122Eb47BD44D77581583e155a4511D7";
      const tokenContract = await new web3.eth.Contract(
        erc721Abi, contractAddress
      );

    //이미지를 ipfs에 올려서 cid받을준비
    const file = await Axios
    .get(FileUrl, {responseType: "blob"})
    .then(response => {
      return response.data;
    }); 
    // ipfs에 있는 이미지로 cid 받기
    const cidOfImage = await client.add(file);
    const image_url = `https://ipfs.infura.io/ipfs/${cidOfImage.path}`;

    //metadata생성 x,y좌표값 , 이미지, 타이틀, 설명
    let metadata = {
      image : image_url,
      X : setCoordinateX,
      Y : setCoordinateY,
      title : setTitle,
      description : setFileDesc
    };
    // Remix에서 transaction 할 때 넣는 cid같은거
    let cidOfMetadata;
    cidOfMetadata = await client.add(JSON.stringify(metadata));
    const metadata_URL = `https://ipfs.infura.io/ipfs/${cidOfMetadata.path}`;
    console.log("metadata", metadata);

    try {
      var result = await tokenContract.methods.mintNFT(account, metadata_URL).send({
        from : account,
        gasLimit : 5000000,
        value : 0,
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

    
    return (
      <div className="test">
        <div>Image</div>
        <input type="file" accept="image/*" onChange={onChange}></input>

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
export default create;