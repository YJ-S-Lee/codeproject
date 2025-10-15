import React, { useEffect } from 'react'
import useCustomLogin from '../../hooks/useCustomLogin'
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsAsync } from '../../slices/cartSlice';

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cartSlice)
  useEffect(() => {
    if(isLogin) {
        dispatch(getCartItemsAsync())
    }
  }, [isLogin])
  return (
    <>
        {isLogin ? <div className='mb-5'>{loginState.nickname}님의 Cart</div> : <></>}
        <div>{cartItems.length}</div>
    </>
  )
}

export default CartComponent