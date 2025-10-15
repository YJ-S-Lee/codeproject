import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = "http://localhost:8080"

const prefix = `${API_SERVER_HOST}/api/todo`

// 특정번호의 todo 조회
// http://localhost:8080/api/todo/33
export const getOne = async(tno) => {
    const res = await jwtAxios.get(`${prefix}/${tno}`)
    return res.data
}

// 페이지, 사이즈 => 여러개가 넘어오므로 객체로 받는다
// http://localhost:8080/api/todo/list?page=3
export const getList = async(pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page:page, size:size}})
    return res.data 
}

// 데이터 전송
export const postAdd = async(todoobj) => {
    const res = await jwtAxios.post(`${prefix}/`, todoobj)
    return res.data
}

// 데이터 수정
export const putOne = async(todo) => {
    const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo)
    return res.data
}

// 데이터 삭제
export const deleteOne = async(todo) => {
    const res = await jwtAxios.delete(`${prefix}/${todo}`)
    return res.data
}