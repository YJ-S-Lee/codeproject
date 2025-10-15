import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

const ResultModal = ({title, content, callbackFn}) => {
  const [show, setShow] = useState(true);
  
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{content}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
                if(callbackFn){
                    callbackFn()
                }
            }}>확인</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ResultModal