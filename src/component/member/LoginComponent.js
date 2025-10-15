import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import useCustomLogin from '../../hooks/useCustomLogin';
import KakaoLoginComponent from './KakaoLoginComponent';

const initState = {
  email: '',
  pw: ''
}

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({...initState})
  const { doLogin, goPath } = useCustomLogin()

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({...loginParam})
  }

  const handleClickLogin = (e) => {
    //비동기호출
    doLogin(loginParam).then(data => {
      console.log(data)
      if(data.error) {
        alert("이메일과 패스워드를 다시 확인하세요.")
      } else {
        alert("로그인 성공")
        goPath('/')
      }
    })
  }

  return (
    <>
      <div className='d-flex justify-content-center my-5'>
        <div className='w-50 mt-5 border p-5'>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" onChange={handleChange} placeholder="이메일을 입력하세요." />
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="pw" onChange={handleChange} placeholder="비밀번호를 입력하세요." />
          </Form.Group>
          <div className='text-end'>
            <Button variant='outline-dark' type='button' onClick={handleClickLogin}>로그인</Button>
          </div>
          <KakaoLoginComponent />
        </div>
      </div>
    </>
  )
}

export default LoginComponent