import React, { useEffect, useMemo } from 'react'
import useCustomLogin from '../../hooks/useCustomLogin'
import useCustomCart from '../../hooks/useCustomCart';
import CartItemComponent from '../cart/CartItemComponent';
import { Badge } from 'react-bootstrap';

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const { refreshCart, cartItems, changeCart } = useCustomCart()
  const total = useMemo(() => {
    let total = 0
    for(const item of cartItems) {
        total += item.price * item.qty
    }
    return total
  }, [cartItems])
  useEffect(() => {
    if(isLogin) {
        refreshCart()
    }
  }, [isLogin])
  return (
    <>
        <div> {isLogin ? <div className='mb-5'>{loginState.nickname}님의 Cart <Badge bg="secondary" className="ms-2">{cartItems.length}</Badge></div> : <></>} </div>
        <div>{cartItems.map(item => <CartItemComponent {...item} key={item.cino} changeCart={changeCart} email={loginState.email} />)}</div>
        <div className='text-end fw-bold'>TOTAL : {total}</div>
    </>
  )
}

export default CartComponent