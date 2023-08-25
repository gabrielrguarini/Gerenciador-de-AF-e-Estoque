import axios from 'axios'
import { loginInterface } from '../Interfaces'


export async function postRegistro(login: loginInterface) {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const endpoint = `${BASE_URL}/registro`
    const response = await axios.post(endpoint, login)
    return response.data
}