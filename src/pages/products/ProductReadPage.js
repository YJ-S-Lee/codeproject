import React from 'react'
import ProductReadComponent from '../../component/product/ProductReadComponent'
import { useParams } from 'react-router-dom'

const ProductReadPage = () => {
  const {pno} = useParams()
  console.log(pno)
  return (
    <>
    <div className='mb-5'>ProductReadPage</div>
    <ProductReadComponent pno={pno} />
    </>
  )
}

export default ProductReadPage