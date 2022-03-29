// import {useDropzone} from 'react-dropzone'
// import erc721Abi from "./erc721Abi";
// // import ipfs from "./utils/ipfs";
// // var ipfs = create("/ip4/127.0.0.1/tcp/5003");
// // var ipfs = new create({ host: "ipfs.infura.io 22", port: 5001, protocol: "https" });
// import Axios from 'axios';
// import Web3 from 'web3'

// import { create } from "ipfs-http-client";
// import React, {useCallback, useState, useMemo, useEffect} from 'react'



// const baseStyle = {
//   flex: 1,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   padding: '20px',
//   borderWidth: 2,
//   borderRadius: 2,
//   borderColor: '#eeeeee',
//   borderStyle: 'dashed',
//   backgroundColor: '#fafafa',
//   color: '#bdbdbd',
//   outline: 'none',
//   transition: 'border .24s ease-in-out'
// };

// const focusedStyle = {
//   borderColor: '#2196f3'
// };

// const acceptStyle = {
//   borderColor: '#00e676'
// };

// const rejectStyle = {
//   borderColor: '#ff1744'
// };


// // 이미지를 드로그하는 부분입니다.
// // example 보고 만든 부분입니다.
// // 이부분은 따로 검색하거나 이해 안하셔도 됩니다.
// function MyDropzone( {onChange, previewFile, onDrop} ) {
//     // Do something with the files
//     const {
//         isDragActive,
//         getRootProps,
//         getInputProps,
//         isFocused,
//         isDragAccept,
//         isDragReject
//       } = useDropzone({accept: 'image/*', onDrop});

//     const style = useMemo(() => ({
//         ...baseStyle,
//         ...(isFocused ? focusedStyle : {}),
//         ...(isDragAccept ? acceptStyle : {}),
//         ...(isDragReject ? rejectStyle : {})
//         }), [
//         isFocused,
//         isDragAccept,
//         isDragReject
//         ]);

//     return (

//         <div className="dropContainer">
//             <div {...getRootProps({style})}>
//                 <input {...getInputProps()} />
//                     {
//                         isDragActive ?
//                         <p>Drop the files here ...</p> :
//                         <p>Drag 'n' drop some files here, or click to select files</p>
//                     }
//                     {
//                         previewFile ?
//                         <img src={previewFile.preview} alt="none" width="200" /> :
//                         "none"
//                     }
//             </div>
//         </div>
//     )
// }



// function Create() {

//   // 초기 변수값 생성
//   const [previewFile, setPreviewFile] = useState();
//   const [userFileUrl, setUserFileUrl] = useState(``);
//   const [userFileIPFSUrl, setUserFileIPFSUrl] = useState("");
//   const [userFileName, setUserFileName] = useState(``);
//   const [userFileDesc, setUserFileDesc] = useState(``);
//   const [web3, setWeb3] =useState();
//   const account = window.localStorage.getItem("account");


//   // 메타버스크에서 web3 객체를 만들기 위한 로직입니다.
//   useEffect(() => {
//       if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
//           try {
//               const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
//               setWeb3(web);
//           } catch (err) {
//               console.log(err);
//           }
//       }
//   }, []);


//   // ipfs를 설정하기 위한 api 설정입니다!
//   // 이것을 통해서 metadata_url을 안전하게 저장합니다.
//   const client = create("https://ipfs.infura.io:5001/api/v0");
//   // file을 로드하는 부분입니다!
// 	async function onChange(e) {
//         const file = e.target.files[0];
//         console.log(e);
// 		    setUserFileUrl(file);
//         console.log(file.path)
// 	}

//   // 드레그 앤 드랍으로 파일을 올릴경우 로직이 필요하여,
//   // 진행한 경로입니다.
//   const onDrop = useCallback( async acceptedFiles => {
//   // setUserFileUrl(acceptedFiles[0]);
//     // const file = acceptedFiles[0];
//     setPreviewFile({preview: URL.createObjectURL(acceptedFiles[0])});
//     setUserFileUrl(URL.createObjectURL(acceptedFiles[0]));
//   });

//   // mint 하는 부분입니다.
// 	const mint = async () => {
//     // 초기설정 스마트 컨트랙트 객체를 생성합니다.
//     const smartContractAddr = "0x09e41b72819d900d297845fe188d302c48fac3ca";
//     const tokenContract = await new web3.eth.Contract(
//       erc721Abi, smartContractAddr 
//     );

    
//     // 1. 먼저 blob 형 url을 받아오고 file 변수에 저장합니다.
//     const file = await Axios
//         .get(userFileUrl, {responseType: "blob"})
//         .then(response => {
//             return response.data;
//       });
          
//     // 2. 여기서 ipfs에 파일을 추가합니다.
//     // 그리고 image url을 image_url변수에 저장합니다.
//     const cid = await client.add(file);
//     const image_url = `https://ipfs.infura.io/ipfs/${cid.path}`;
  
//   // metadata 생성합니다.
//     let metadata = { 
//       image: image_url,
//       name: userFileName, 
//       description: userFileDesc 
//     };

//     // 3. 메타데이터를 ipfs를 통해 한번 더 만듭니다.
//     // client add 한후 최종 메타데이터는 변수 metadata_url입니다.
//     let cid2;
//     cid2 = await client.add(JSON.stringify(metadata));
//     const metadata_url = `https://ipfs.infura.io/ipfs/${cid2.path}`;
            
//     try {      
//         // 최종적으로 주문서를 만들어 mint를 발생 시킵니다.
//         var result =  await tokenContract.methods.mintNFT(account, metadata_url).send({
//         from: account,
//         gasLimit: 5000000,
//         value: 0,
//         });
//         // 결과값 출력!
//         console.log(result);
//     } catch (err) {
//       //  에러가 날경우 err 출력
//       console.log(err);
//     }
// 		/* } catch (error) {
// 			console.log("Error uploading metadata file: ", error);
// 			console.log(metadata, cid, metadata_url);
// 		} */
// 	};

// 	return (
// 		<div className="Create">
//             <div className="create-box">
//                 <h1>Create</h1>
//                 <h4>You can create NFT image</h4>
//                 {userFileIPFSUrl && <img src={userFileIPFSUrl} width="600px" alt="create"/>}

//                 {`이미지를 드래그해서 보여주는 부분입니다 onDrop(드랍)을하면 onDrop 함수가  실행됩니다.`}
            
//                 <MyDropzone onChange={onChange} onDrop={onDrop} previewFile={previewFile} />

 
//                 <div className="create-inputbox">
//                     <div className="userInfo">주소: {account}</div>
//                         <div className="create-input-div">
// 				 {`파일 이름을 적는 부분입니다.`}
//                             <div>File Name:</div>
//                             <input
//                                 type="text"
//                                 onChange={(e) => {
//                                     setUserFileName(e.target.value);
//                                 }}
//                             ></input>
//                         </div>
//                         <div className="create-input-div">
// 				{`설명서를 적는 부분입니다`}
//                             <div>Description:</div>
//                             <input
//                                 type="text"
//                                 onChange={(e) => {
//                                     setUserFileDesc(e.target.value);
//                                 }}
//                             ></input>
//                         </div>
//                         <div className="create-input-div">
// 				 {`최종적으로 민트를 승인하는 부분입니다!`}
//                             <button
//                                 className="mint"
//                                 onClick={() => {
//                                     mint();
//                                 }}
//                             >
//                                 mint
//                             </button>
//                         </div>
//                     </div>
//             </div>
// 		</div>
// 	);

// export default Create;
// }
function App() {

  return(
<div>fdsf</div>

  )
}
export default App;
