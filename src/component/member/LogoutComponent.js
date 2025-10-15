import React from 'react'
import { Button } from 'react-bootstrap'
import useCustomLogin from '../../hooks/useCustomLogin'

const LogoutComponent = () => {
  const { doLogout, goPath } = useCustomLogin()

  const handClickLogout = () => {
    doLogout()
    alert("로그아웃 되었습니다.")
    goPath('/')
  }

  return (
    <>
      <div className='d-flex justify-content-center my-5'>
        <div className='w-50 mt-5 border p-5 text-center'>
          <h3 className='mb-5'>Logout Component</h3>
          <div>
            <Button variant='secondary' type="button" onClick={handClickLogout}>로그아웃</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogoutComponent