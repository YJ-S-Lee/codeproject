import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal';
import { productGetOne } from '../../api/productApi';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';

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

  //장바구니 기능
  const { changeCart, cartItems } = useCustomCart()

  //로그인 정보
  const { loginState } = useCustomLogin()

  //장바구니 추가
  const handleClickAddCart = () => {
    let qty = 1
    const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0]
    if(addedItem) {
      //아이템 리스트에 해당 상품이 있다면
      if(window.confirm("이미 추가한 상품입니다. 추가하시겠습니까?") === false) {
        return;
      }
      qty = addedItem.qty + 1
    }
    changeCart({ email: loginState.email, pno: pno, qty: qty })
  }

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
            <div className='text-danger'>상품번호 : {product.pno}</div>
            <h4 className='mb-3 bw-bold'>상품명 : {product.pname}</h4>
            <div>가격 : {product.price}원</div>
            <div>상세설명 : {product.pdesc}</div>
          </div>
          <hr />
          <div className='mt-3 text-end'>
            <Button variant='outline-success me-2' onClick={handleClickAddCart}>장바구니 추가</Button>
            <Button variant="outline-dark me-2" onClick={() => goList()}>목록보기</Button>
            <Button variant="secondary" onClick={() => goModify(pno)}>수정</Button>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="pt-3">
        <div>상세이미지 보기</div>
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