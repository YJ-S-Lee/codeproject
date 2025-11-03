import React from 'react'
import { API_SERVER_HOST } from '../../api/todoApi'
import { Button, Card } from 'react-bootstrap';

const host = API_SERVER_HOST
const CartItemComponent = ({ cino, pname, price, pno, qty, imageFile, changeCart, email }) => {
    const handleClickQty = (amount) => {
        changeCart({ email, cino, pno, qty: qty + amount })
    }

    return (
        <>
        <Card className='mb-4'>
            <Card.Img variant='top' src={`${host}/api/products/view/${imageFile}`} style={{ objectFit: "cover", padding: "20px" }} fluid />
            <Card.Body>
                <Card.Title>{pname}</Card.Title>
                <Card.Text>
                    상품번호 : {pno} <br />
                    가격 : {price} <br />
                    수량 : {qty}
                    <span className='ms-lg-5'>
                        <Button variant='outline-success me-2' size='sm' onClick={() => handleClickQty(1)}> + </Button> 
                        <Button variant='outline-danger me-2' size='sm' onClick={() => handleClickQty(-1)}> - </Button> 
                    </span>
                </Card.Text>
                <hr />
                <div className='text-end mb-3'>{qty * price}원</div>
                <div className='text-center'><Button variant='outline-danger' onClick={() => handleClickQty(-1 * qty)}> item 삭제</Button></div>
            </Card.Body>
        </Card>
        </>
    )
}

export default CartItemComponent