import axios from 'axios'
import { notaInterface } from '../Interfaces'


export async function postNota(nota: notaInterface): Promise<notaInterface> {
    const token = localStorage.getItem("token")
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const response = await axios.post(BASE_URL, nota, {
        headers: {
            "x-access-token": token,
        },
    })
    console.log("postNota: ", response.data)
    return response.data
}