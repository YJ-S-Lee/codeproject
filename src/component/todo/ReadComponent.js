import React, { useEffect, useState } from 'react'
import { getOne } from '../../api/todoApi'
import { Button, Card } from 'react-bootstrap'
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    tno : 0,
    title : '',
    content : '',
    dueDate : null,
    complete : false
}

// 특정번호의 todo 조회
// http://localhost:8080/api/todo/33
const ReadComponent = ({tno}) => {
    const [todo, setTodo] = useState(initState)
    const { goList, goModify } = useCustomMove();
    useEffect(() => {
        getOne(tno).then(data => {
            console.log(data)
            setTodo(data)
        })
    }, [tno])
    
  return (
        <>
        <div>
            <div>
                {makeDiv("Tno", todo.tno)}
                {makeDiv("title", todo.title)}
                {makeDiv("content", todo.content)}
                {makeDiv("dueDate", todo.dueDate)}
                {makeDiv("complete", todo.complete ? "Complete" : "Not Yet")}
            </div>
            <div className='mt-4'>
                <Button variant="outline-dark me-2" onClick={() => goList()}>목록보기</Button>
                <Button variant="dark" onClick={() => goModify(todo.tno)}>수정</Button>
            </div>
        </div>
        </>
    )
}

// 리액트 부트스트랩 카드
function makeDiv(title, value) {
    return(
        <Card className='mx-auto mb-2'>
            <Card.Body className='d-flex'>
                <Card.Title className='w-25 text-primary'>{title}Card Title</Card.Title>
                <Card.Text>
                    {value}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ReadComponent