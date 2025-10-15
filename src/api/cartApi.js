import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/cart`

//현재 사용자의 로그인 정보를 이용하기 때문에 jwaAxios를 이용해서 API서버를 호출한다.
//현재 사용자의 장바구니에 담겨 있는 장바구니 아이템을 조회한다.
export const getCartItems = async() => {
    const res = await jwtAxios.get(`${host}/items`)
    return res.data
}

//장바구니 아이템을 추가하거나 수량을 변경한다.
export const postChangeCart = async(cartItem) => {
    const res = await jwtAxios.post(`${host}/change`, cartItem)
    return res.data
}