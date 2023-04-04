import axios from 'axios'
import { rowInterface } from '../Interfaces'

export async function postList(listaProdutos: rowInterface[]): Promise<rowInterface[]> {
    const endpoint = `http://localhost:3000/`
    const response = await axios.post(endpoint, listaProdutos)
    console.log(response.data)
    return response.data
}