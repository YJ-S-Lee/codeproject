import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { postAdd } from '../../api/todoApi';
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove'

const initState = {
  title: '',
  content: '',
  dueDate: ''
}

const AddComponent = () => {
  const [todo, setTodo] = useState(initState)

  // 결과 데이터가 있으면 resultModal을 보여준다.
  const [result, setResult] = useState(null)
  const { goList } = useCustomMove()

  const handleChangeTodo = (e) => {
    const {name, value} = e.target
    // setTodo는 새로운 state(객체)를 반환해야한다.
    // 우리가 반환하고 싶은 값은 객체 -> {...prev, [name] : value }
    // 객체 리터널을 값 그대로 반환하려면 중괄호를 소괄호로 감싸야 한다,
      setTodo((prev) => ({
        ...prev, [name] : value
      }))
    }

  const handleClickAdd = () => {
    console.log(todo)
    postAdd(todo).then(result => {
        console.log(result)
        setResult(result.TNO)
        // setTodo(initState) 값을 그대로 사용, setTodo({...initState}) 얕은 복사, 주소값이 바뀜
        setTodo({...initState})
    }).catch(e => {
        console.log(e)
    })
  }

  const closeModal = () => {
    setResult(null)
    goList()
  }

  return (
    <>
    {result ? <ResultModal title={'Add Result'} content={`${result}번 게시글 추가`} callbackFn={closeModal} /> : <></>}
    <Form>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label column sm="2">제목</Form.Label>
        <Form.Control type='text' name="title" value={todo.title} placeholder="제목을 입력하세요." onChange={handleChangeTodo} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label column sm="2">내용</Form.Label>
        <Form.Control as="textarea" name="content" value={todo.content} rows={3} placeholder="내용을 입력하세요." onChange={handleChangeTodo} />
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicDueDate">
        <Form.Label column sm="2">날짜</Form.Label>
        <Form.Control type='date' name="dueDate" value={todo.dueDate} onChange={handleChangeTodo} />
      </Form.Group>
      <Button variant='dark' type='button' onClick={handleClickAdd}>
        전송
      </Button>
    </Form>
    </>
  )
}

export default AddComponent