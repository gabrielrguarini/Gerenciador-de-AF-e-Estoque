import axios from 'axios'
import { loginInterface } from '../Interfaces'


export async function postRegistro(login: loginInterface) {
    const endpoint = `http://localhost:3000/registro`
    const response = await axios.post(endpoint, login)
    return response.data
}