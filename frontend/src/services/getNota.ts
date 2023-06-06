import axios from "axios"

export async function getNota() {
    const endpoint = `http://localhost:3000/`
    const response = await axios.get(endpoint)
    console.log("getNota: ", response.data)
    return response.data
}