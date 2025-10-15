import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { modifyMember } from '../../api/memberApi'
import useCustomLogin from '../../hooks/useCustomLogin'
import ResultModal from '../common/ResultModal'

const initState = {
    email: '',
    pw: '',
    nickname: ''
}

const ModifyComponent = () => {
    const [member, setMember] = useState(initState)
    const loginInfo = useSelector(state => state.loginSlice)
    const { goPath } = useCustomLogin()
    const [result, setResult] = useState()

    useEffect(() => {
        setMember({...loginInfo, pw: 'ABCD'})
    }, [loginInfo])
    
    const handleChange = (e) => {
        member[e.target.name] = e.target.value
        setMember({...member})
    }

    const handleClickModify = () => {
        modifyMember(member).then(result => {
            setResult('Modified')
        })
    }
    
    const colseModal = () => {
        setResult(null)
        goPath('/')
    }

    return (
    <>
    {result ? <ResultModal title={'회원정보'} content={'정보수정완료'} callbackFn={colseModal}></ResultModal> : <></>}
    <div className='d-flex justify-content-center my-5'>
        <div className='w-50 mt-5 border p-5'>
            <Form.Group className="mb-3">
                <Form.Label className='fw-bold'>EMAIL</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    value={member.email}
                    onChange={handleChange} />
                <Form.Text className="text-secondary">이메일은 수정할 수 없습니다.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className='fw-bold'>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="pw"
                    value={member.pw}
                    onChange={handleChange}/>
                <Form.Text className="text-secondary">기본설정은 ABCD입니다.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className='fw-bold'>nickname</Form.Label>
                <Form.Control
                    type="text"
                    name="nickname"
                    value={member.nickname}
                    readOnly />
                <Form.Text className="text-secondary">nickname은 수정할 수 없습니다.</Form.Text>
            </Form.Group>
            <div className='text-end'>
                <Button variant="outline-dark" type="button" onClick={handleClickModify}>수정</Button>
            </div>
        </div>
    </div>
    </>
    )
}

export default ModifyComponent