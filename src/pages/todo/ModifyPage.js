import React from 'react'
import ModifyComponent from '../../component/todo/ModifyComponent'
import { useParams } from 'react-router-dom'

const ModifyPage = () => {
  const { tno } = useParams()
  return (
    <>
    <div className='mb-5'>ModifyPage</div>
    <ModifyComponent tno={tno} />
    </>
  )
}

export default ModifyPage