import axios from 'axios'
import { notaInterface } from '../Interfaces'


export async function postNota(nota: notaInterface): Promise<notaInterface> {
    const token = localStorage.getItem("token")
    const endpoint = `http://localhost:3000/`
    const response = await axios.post(endpoint, nota, {
        headers: {
            "x-access-token": token,
        },
    })
    console.log("postNota: ", response.data)
    return response.data
}