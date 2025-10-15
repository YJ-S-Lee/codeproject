import { Cookies } from 'react-cookie';

const cookies = new Cookies()

//쿠키 저장(쿠키이름, 쿠키값, 며칠동안 유지할 것인지 보관기한)
//setCookie 함수는 이름(name), 값(value), 유효기간(days)을 받아서 현재 날짜 기준으로 만료일을 계산하고 사이트 전역에서 접근 가능한 쿠키를  설정하는 로직
export const setCookie = (name, value, days) => {
    const expires = new Date()
    //지금 시각 + days일 만큼 보관하도록 쿠키 만료일을 지정하는 것
    //예 : 오늘이 10월 1일이고 days = 7 이라면 expires는 10월 8일로 변경됨
    expires.setUTCDate(expires.getUTCDate() + days) //보관 기한

    //실제로 쿠키를 브라우저에 저장하는 부분
    //path: '/' -> 사이트 전체에서 이 쿠키를 접근할 수 있음(특정 경로 제한 없음)
    //expires: expires -> 앞에서 계산한 만료일을 적용
    return cookies.set(name, value, { path: '/', expires: expires })
}

//조회
export const getCookie = (name) => {
    return cookies.get(name)
}

//쿠키삭제
export const removeCookie = (name, path = '/') => {
    cookies.remove(name, { path })
}