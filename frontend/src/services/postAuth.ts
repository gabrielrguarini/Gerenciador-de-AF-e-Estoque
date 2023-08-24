import axios from "axios";
import { loginInterface } from "../Interfaces";
import { useContext } from "react";

export async function postAuth(login: loginInterface) {
    const token = localStorage.getItem("token");
    const endpoint = `http://localhost:3000/auth`;
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
