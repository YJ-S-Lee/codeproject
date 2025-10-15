import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi'
import { useDispatch } from 'react-redux'
import useCustomLogin from '../../hooks/useCustomLogin'
import { login } from '../../slices/loginSlice'

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams()
    const authCode = searchParams.get("code")
    const dispatch = useDispatch()
    const { goPath } = useCustomLogin()
    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken) 
            //카카오에서 받은 회원정보
            getMemberWithAccessToken(accessToken).then(memberInfo => {
              console.log("memberInfo: {}", memberInfo)
              dispatch(login(memberInfo))
              //소셜 회원이 아니라면
              if(memberInfo && !memberInfo.social) {
                goPath('/')
              } else {
                goPath('/member/modify')
              }
            })
        })
    }, [authCode])
  return (
    <>
        <div className='mb-5'>kakao Login Redirect</div>
        <div>{authCode}</div>
    </>
  )
}

export default KakaoRedirectPage