import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/products`

export const productPostAdd = async(product) => {
    const header = { header: { "Content-Type": "multipart/form-data" } }
    const res = await jwtAxios.post(`${host}/`, product, header)
    return res.data
}

//목록은 json데이터
export const productGetList = async(pageParam) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${host}/list`, { params: { page: page, size: size } })
    return res.data
}

//특정 상품 데이터 조회
export const productGetOne = async(tno) => {
    const res = await jwtAxios.get(`${host}/${tno}`)
    return res.data
}

//수정
export const productPutOne = async(pno, product) => {
    //header지정
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await jwtAxios.put(`${host}/${pno}`, product, header)
    return res.data
}

//삭제
export const productDeleteOne = async(pno) => {
    const res = await jwtAxios.delete(`${host}/${pno}`)
    return res.data
}


