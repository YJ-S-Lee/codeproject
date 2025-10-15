import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    //로그인 상태
    const loginState = useSelector(state => state.loginSlice)

    //로그인 여부
    const isLogin = loginState.email ? true : false
    
    //로그인 함수
    const doLogin = async(loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam))
        return action.payload
    }

    //로그아웃 함수
    const doLogout = () => {
        dispatch(logout())
    }

    //페이지 이동
    const goPath = (path) => {
        navigate({ pathname: path }, { replace: true })
    }

    //로그인 페이지로 이동
    const goLogin = () => {
        navigate({ pathname: '/member/login' }, { replace: true })
    }

    //로그인 페이지로 이동 컴포넌트
    const goLoginReturn = () => {
        return <Navigate replace to='/member/login' />
    }
    return { loginState, isLogin, doLogin, doLogout, goPath, goLogin, goLoginReturn }
}

export default useCustomLogin;