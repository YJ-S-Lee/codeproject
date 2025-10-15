import React from 'react'
import useCustomLogin from '../hooks/useCustomLogin'

const AboutPage = () => {
  //로그인 상태, 로그인 상태 체크 후 로그인 상태가 아니면 로그인 페이지로 이동
  const { isLogin, goLoginReturn } = useCustomLogin() 
  if(!isLogin) {
    return goLoginReturn()
  }

  return (
    <>
      <div className='mb-5'>AboutPage</div>
    </>
  )
}

export default AboutPage