import axios from 'axios'
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create()

const refreshJWT = async (accessToken, refreshToken) => {

    const host = API_SERVER_HOST

    const header = { headers: { "Authorization": `Bearer ${accessToken}` } }

    //refreshToken을 쿼리로 붙여서 보낸다.
    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    console.log("새로 만들어진 refreshToken {}", res.data)

    return res.data
}

//요청 beforeReq(), requestFail()  / 응답beforeRes() responseFail()
//before request
const beforeReq = (config) => {
    console.log("before request.............")
    const memberInfo = getCookie("member")

    if (!memberInfo) {
        console.log("Member NOT FOUND")
        return Promise.reject(
            {
                response:
                {
                    data:
                        { error: "REQUIRE_LOGIN" }
                }
            }
        )
    }
    const { accessToken } = memberInfo

    // Authorization 헤더 처리 
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}

//fail request
const requestFail = (err) => {
    console.log("request error............")

    return Promise.reject(err)
}

//before return response
const beforeRes = async (res) => {
    console.log("before return response...........")
    console.log(res)
    const data = res.data
    if (data && data.error === 'ERROR_ACCESS_TOKEN') {

        const memberCookieValue = getCookie("member")

        //memberCookieValue안에 이미accessToken과 refreshToken이 있다.
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)
        console.log("refreshJWT RESULT", result)

        //result.accessToken : 새로운 accessToken
        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        //저장한다. 1은 쿠키의 유효 기간. 일(day) 단위로 설정
        setCookie("member", JSON.stringify(memberCookieValue), 1)

        //원래의 호출 
        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest)

    }

    return res
}

//fail response
const responseFail = (err) => {
    console.log("response fail error.............")
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)

jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios