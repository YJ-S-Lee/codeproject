import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal';
import { productGetOne } from '../../api/productApi';
import { API_SERVER_HOST } from '../../api/todoApi';

const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  uploadFileNames : []
}

const host = API_SERVER_HOST

const ProductReadComponent = ({ pno }) => {
  const {goList, goModify} = useCustomMove()
  const [product, setProduct] = useState(initState)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    setFetching(true)
    productGetOne(pno).then(data => {
        console.log(data)
        setProduct(data)
        setFetching(false)
    })
  }, [pno])

  return (
    <>
    {fetching ? <FetchingModal /> : <></>}
    <Container>
      <Row className="pb-3">
        <Col md={6}>
          <Image 
            src={`${host}/api/products/view/${product.uploadFileNames[0]}`} fluid
            alt='product' 
            style={{  width: "100%", objectFit: "cover", padding: "10px" }} />
        </Col>
        <Col md={6} >
          <div>
            <p className='text-danger'>상품번호 : {product.pno}</p>
            <h4 className='mb-3 bw-bold'>상품명 : {product.pname}</h4>
            <p>가격 : {product.price}원</p>
            <p>상세설명 : {product.pdesc}</p>
          </div>
          <hr />
          <div className='mt-3 text-end'>
            <Button variant="outline-dark" onClick={() => goList()}>목록보기</Button>
            <Button variant="secondary ms-2" onClick={() => goModify(pno)}>수정</Button>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="pt-3">
        <p>상세이미지 보기</p>
        {product.uploadFileNames.map((imgFile, i) => 
          <Image 
            src={`${host}/api/products/view/${imgFile}`} fluid
            alt='product' 
            style={{  width: "80%", objectFit: "cover", padding: "10px" }} />
        )}
      </Row>
    </Container>
    </>
  )
}

export default ProductReadComponent