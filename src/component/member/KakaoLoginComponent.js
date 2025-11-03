import React from 'react'
import { getKakaoLoginLink } from '../../api/kakaoApi'
import { Row, Button } from 'react-bootstrap'

const KakaoLoginComponent = () => {
    //useNavigate 는 React Router에서 제공하는 네비게이션 훅으로 전달된 경로를 현재 호스트 주소에 추가하는 방식으로 작동
    //window.location.href를 사용하면 브라우저에서 직접 절대 경로로 이동
    const gokakao = () => {
        window.location.href = getKakaoLoginLink();
    }

  return (
    <>
        <Row className='mt-5'>
            <div>로그인 시에 자동 가입처리 됩니다.</div>
            <Button variant='warning' onClick={gokakao}>카카오 톡으로 로그인하기</Button>
        </Row>
    </>
  )
}

export default KakaoLoginComponent