import React from 'react'
import ProductModifyComponent from '../../component/product/ProductModifyComponent'
import { useParams } from 'react-router-dom'

const ProductModifyPage = () => {
  const {pno} = useParams()
  console.log(pno)
  return (
    <>
    <div className='mb-5'>ProductModifyPage</div>
    <ProductModifyComponent pno={pno} />
    </>   
  )
}

export default ProductModifyPage