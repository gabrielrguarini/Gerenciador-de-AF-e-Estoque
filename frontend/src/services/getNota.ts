import axios from "axios"

export async function getNota() {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const endpoint = `${BASE_URL}`
    const response = await axios.get(endpoint)
    console.log("getNota: ", response.data)
    return response.data
}