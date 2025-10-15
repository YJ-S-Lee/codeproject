import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from '../api/memberApi';
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil";

const initState = {
    email: ''
}

//쿠키에서 로그인 정보 로딩
const loadMemberCookie = () => {
    const memberInfo = getCookie("member")
    //닉네임 처리
    if(memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }
    return memberInfo
}

//creatAsyncThunk('이름', () => {})
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})

const loginSlice = createSlice ({
    name : 'LoginSlice',
    initialState: loadMemberCookie() || initState,    //쿠키가 없다면 초기값 사용
    reducers: {
        login: (state, action) => {
            console.log("login...")
            //소셜 로그인 회원이라면
            const payload = action.payload
            setCookie("member", JSON.stringify(payload), 1) //1일
            return payload
        },
        logout: (state, action) => {
            console.log("logout...")
            removeCookie("member")
            return { ...initState }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.pending, (state, action) => {
            //데이터오는 중
            console.log("pending : 데이터 오는 중")
        })
        .addCase(loginPostAsync.fulfilled, (state, action) => {
            //성공
            console.log("fulfilled : 성공")
            const payload = action.payload
            //정상적인 로그인 쿠키저장
            if(!payload.error) {
                setCookie("member", JSON.stringify(payload), 1) //1일
            }
            return payload
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            //실패
            console.log("rejected : 실패")
        })
    }
}) 

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer