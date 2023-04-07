import axios from 'axios'
import { notaInterface } from '../Interfaces'

export async function postNota(nota: notaInterface): Promise<notaInterface> {
    const endpoint = `http://localhost:3000/`
    const response = await axios.post(endpoint, nota)
    console.log("postNota: ", response.data)
    return response.data
}