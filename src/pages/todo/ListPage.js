import React from 'react'
import { Container } from 'react-bootstrap';
import ListComponent from '../../component/todo/ListComponent';

const ListPage = () => {

  return (
    <>
    <Container>
      <div className='mb-5'>ListPage</div>
      <ListComponent />
    </Container>
    </>
  )
}

export default ListPage