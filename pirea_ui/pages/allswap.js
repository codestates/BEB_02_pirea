import Layout from "../components/layout";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";

export default function AllSwap() {
  const [tokenData,setTokenData] = useState();

  const apiEndPoint = "http://www.pirea.kro.kr/api/v0.1/swap/get/all" ;
  const fetcher = async (url) => await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*' ,
    },
      params: {
        more : "1"
      },
  }).then((res) => res.data);

  const {data, error}= useSWR(apiEndPoint, fetcher);
  console.log(`data`, typeof(data));
  
  // console.log(JSON.stringify(data));

  const data1 = (JSON.stringify(data[0].wantForm.tokenAddress));
  console.log(data1);

  // const obj = JSON.parse(data);
  //  console.log(`data1`,data.id);

 if (error){
   return(
     <>
      <Layout>
        <div >
          failed
        </div>
      </Layout>
     </>
   )
 }

 if (!data){
   return(
     <>
     <Layout>
       <div>
         Loading
       </div>
     </Layout>
     </>
   )
 }
 
  return (
    <>
      <Layout>
        {data.map((e) => (
        <Container>
          <Row>
            <Col xs={1}>
              <Card.Img src="data:image/jpeg;base64,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" />
            </Col>

            <Col>
              <Card.Body>
                <Card.Text>makerAddress : {e.makerAddress}</Card.Text>
                <Card.Text>Maker ContractAddress : {e.wantForm.tokenAddress}</Card.Text>
                <Card.Text>tokenId : { e.wantForm.tokenId}</Card.Text>
                <Card.Text>type : {e.wantForm.type }</Card.Text>
              </Card.Body>
            </Col>

            <Col xs={1}>
              <Card.Img src="https://cdn-icons-png.flaticon.com/512/4305/4305572.png" />
            </Col>

            <Col xs={1}>
              <Card.Img src="data:image/jpeg;base64,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" />
            </Col>

            <Col>
              <Card.Body>
                <Card.Text>takerAddress : {e.takerAddress} </Card.Text>
                <Card.Text>Taker ContractAddress : { e.haveForm.tokenAddress}</Card.Text>
                <Card.Text>tokenId : { e.haveForm.tokenId}</Card.Text>
                <Card.Text>type : { e.haveForm.type}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Container>
        ))}
      </Layout>
    </>
  );
}
