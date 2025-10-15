import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap' 
import { deleteOne, getOne, putOne } from '../../api/todoApi'
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove'

const initState = {
    tno : 0,
    title: '',
    content: '',
    dueDate: '',
    complete: false
}

const ModifyComponent = ({tno}) => {
    const [todo, setTodo] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const { goList, goRead } = useCustomMove()

    useEffect(() => {
        getOne(tno).then(data => setTodo(data))
    }, [tno])

    const handleChangeTodo = (e) => {
        todo[e.target.name] = e.target.value
        setTodo({ ...todo })
    }

    const handleChangeTodoComplete = (e) => {
        const value = e.target.value
        todo.complete = (value === 'Y')
        setTodo({ ...todo })
    }

    const handleClickModify = () => {
        putOne(todo).then(data => {
            console.log("수정 완료" + data)
            setResult("수정 완료")
        })
    }

    const handleClickDelte = () => {
        deleteOne(tno).then(data => {
            console.log("삭제 완료" + data)
            setResult("삭제 완료")
        })
    }

    const closeModal = () => {
        if(result === "삭제 완료") {
            goList()
        } else {
            goRead(tno)
        }
    }

  return (
    <>
    {result ? <ResultModal title={'결과'} content={`${result}`} callbackFn={closeModal} /> : <></>}
    <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label column sm="2">TNO</Form.Label>
        <Form.Control type={"text"} name="tno" value={todo.tno} onChange={handleChangeTodo} disabled />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label column sm="2">제목</Form.Label>
        <Form.Control type={"text"} name="title" value={todo.title}onChange={handleChangeTodo} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label column sm="2">내용</Form.Label>
        <Form.Control as={"textarea"} name="content" value={todo.content} rows={3} onChange={handleChangeTodo} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicDueDate">
        <Form.Label column sm="2">날짜</Form.Label>
        <Form.Control type={"date"} name="dueDate" value={todo.dueDate} onChange={handleChangeTodo} />
    </Form.Group>
    <Form.Select aria-label="COMPLETE" onChange={handleChangeTodoComplete} value={todo.complete ? "Y" : "N"}>
        <option value="Y">Completed</option>
        <option value="N">Not Yet</option>
    </Form.Select>
    <div className='mt-4 text-end'>
        <Button variant='outline-dark' className='me-2' onClick={handleClickModify}>수정</Button>
        <Button variant='secondary' onClick={handleClickDelte}>삭제</Button>
    </div>
    </>
  )
}

export default ModifyComponent