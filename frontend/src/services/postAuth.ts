import axios from "axios";
import { loginInterface } from "../Interfaces";
import { useContext } from "react";

export async function postAuth(login: loginInterface) {
    const token = localStorage.getItem("token");
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const endpoint = `${BASE_URL}/auth`
    const response = await axios.post(endpoint, login, {
        headers: {
            "x-access-token": token,
        },
    });
    if (response.data) {
        localStorage.setItem("token", response.data.token);

    }
    console.log("postAuth: ", response.data);
    return response.data;
}
