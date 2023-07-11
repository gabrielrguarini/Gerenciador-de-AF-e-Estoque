import axios from 'axios'
import { loginInterface } from '../Interfaces'


export async function postAuth(login: loginInterface) {
    const endpoint = `http://localhost:3000/auth`
    const response = await axios.post(endpoint, login)
    if (response.data) {
        localStorage.setItem("token", response.data.token)
    }
    console.log("postAuth: ", response.data)
    return response.data
}