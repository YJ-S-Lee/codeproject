import React, { useState, useRef } from 'react'
import { Button, Form, Image, Row, Col } from 'react-bootstrap'
import { API_SERVER_HOST } from '../../api/todoApi';
import { useEffect } from 'react';
import { productDeleteOne, productGetOne, productPutOne } from '../../api/productApi';
import FetchingModal from '../common/FetchingModal';
import useCustomMove from '../../hooks/useCustomMove';
import ResultModal from '../common/ResultModal';

const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  delFlag: false,
  uploadFileNames: []
}

const host = API_SERVER_HOST;

const ProductModifyComponent = ({ pno }) => {

  const [product, setProduct] = useState(initState)

  //이동용함수 추가
  const { goRead, goList } = useCustomMove()

  //fetching
  const [fetching, setFetching] = useState(false)

  //결과 모달창
  const [result, setResult] = useState(null);

  //첨부파일데이터에 사용 : 리렌더링과 무관하게 유지해야 하는 데이터에 사용
  const uploadRef = useRef()

  //상품정보 가져온다
  useEffect(() => {
    setFetching(true)
    productGetOne(pno).then(data => {
      setProduct(data)
      setFetching(false)
    })
  }, [pno])

  const deleteOldImage = (imageName) => {
    //삭제할 이미지이름이 들어오면 filtering한다
    const resultfileName = product.uploadFileNames.filter(fileName => fileName !== imageName)

    product.uploadFileNames = resultfileName
    setProduct({ ...product })
  }

  //수정처리
  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value
    setProduct({ ...product })
  }

  //수정완료
  const handleClickModify = () => {
    const files = uploadRef.current.files
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    //other data
    formData.append("pname", product.pname)
    formData.append("pdesc", product.pdesc)
    formData.append("price", product.price)
    formData.append("delFlag", product.delFlag)

    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i])
    }
    //fetching
    setFetching(true)
    setResult('Modified')

    productPutOne(pno, formData).then(data => { //수정 처리
      setFetching(false)
    })
  }

  //삭제하기
  const handleClickDelete = () => {

    setFetching(true)
    productDeleteOne(pno).then(data => {
        setResult("Deleted")
        setFetching(false)
    })
  }

  const closeModal = () => {
    //수정 후 조회화면으로이동한다
    if (result === 'Modified') {
      goRead(pno)
    } else if (result === 'Deleted') {
      goList({ page: 1 })  //리스트로 이동
    }
    setResult(null)
  }

  return (
    <>
      {fetching ? <FetchingModal /> : <></>}
      {result ?
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        />
        : <></>
      }
      <Form.Group className="mb-3" controlId="pnameForm.ControlInput1">
        <Form.Label>상품명</Form.Label>
        <Form.Control
          type="text"
          name="pname"
          value={product.pname}
          onChange={handleChangeProduct}
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="pdescForm.ControlTextarea1">
        <Form.Label>상품 상세 설명</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="pdesc"
          value={product.pdesc}
          onChange={handleChangeProduct}
        >
          {product.pdesc}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="priceForm.ControlInput1">
        <Form.Label>가격</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product.price}
          onChange={handleChangeProduct}
        />
      </Form.Group>
      <Form.Select aria-label="Default select example"
        className="mb-3"
        name="delFlag"
        value={product.delFlag}
        onChange={handleChangeProduct}
      >
        <option value={false}>사용</option>
        <option value={true}>삭제</option>
      </Form.Select>
      <Form.Group className="mb-3" controlId="formFileMultiple">
        <Form.Label>첨부이미지</Form.Label>
        <Form.Control
          type="file"
          name="files"
          ref={uploadRef}
          multiple
        />
      </Form.Group>
      <Row>
        <hr />
        <h5>상세이미지보기</h5>
        {product.uploadFileNames.map((imgFile, i) => {
          if(i===0) return null;
          return (
          <Col>
            <Image
              src={`${host}/api/products/view/s_${imgFile}`}
              className='mb-3'
            />
            <br />
            <Button
              variant='danger'
              onClick={() => deleteOldImage(imgFile)}
            >삭제</Button>
          </Col>
          )
        }   
      )}
    </Row>
      <hr />
      <div className='mt-5 text-end'>
        <Button variant='danger' onClick={handleClickDelete}>삭제하기</Button>
        <Button variant='secondary' onClick={handleClickModify} className='mx-3'>수정하기</Button>
        <Button variant='outline-dark' onClick={() => goList()} className='me-3'>목록보기</Button>
      </div>
    </>
  )
}

export default ProductModifyComponent