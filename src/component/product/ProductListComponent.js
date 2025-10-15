import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button  } from 'react-bootstrap';
import useCustomMove from '../../hooks/useCustomMove';
import FetchingModal from '../common/FetchingModal';
import { productGetList } from '../../api/productApi';
import { API_SERVER_HOST } from '../../api/todoApi';
import PageComponent from '../common/PageComponent';

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: [],
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const ProductListComponent = () => {
    const {page, size, goList, refresh, goRead} = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    //자동으로 true, 다 가져오면 false
    const [fetching, setFetching] = useState(false)

    const host = API_SERVER_HOST

    useEffect(() => {
        setFetching(true)
        productGetList({page, size}).then(data => {
            console.log(data)
            setServerData(data)
            setFetching(false)
        })
    }, [page, size, refresh])

  return (
    <>
    {fetching ? <FetchingModal /> : <></>}
    <Container>
        <Row>
            {serverData.dtoList.map(product => 
                <Col md={6}>
                    <Card className='mb-5'>
                        <Card.Img 
                        variant="top" 
                        src={`${host}/api/products/view/${product.uploadFileNames[0]}`} 
                        alt='product'
                        style={{ objectFit: "cover", padding: "50px" }} />
                        <Card.Body>
                            <Card.Title>{product.pname}</Card.Title>
                            <Card.Text>
                                <p>NO : {product.pno}<br />
                                    가격 : {product.price}<br />
                                </p>
                            </Card.Text>
                            <Button variant="outline-dark" onClick={() => goRead(product.pno)}>상세보기</Button>
                        </Card.Body>
                    </Card>
                </Col>
            )}
            <PageComponent serverData={serverData} goList={goList} />
        </Row>
    </Container>
    </>
  )
}

export default ProductListComponent