import axios from 'axios'
import { rowInterface } from '../Interfaces'

export async function postList(listaProdutos: rowInterface[]): Promise<rowInterface[]>{
    const endpoint  = `http://localhost:3000/`
    console.log('teste')
    console.log(...listaProdutos)
    const response = await axios.post(endpoint, ...listaProdutos)
    return response.data
}