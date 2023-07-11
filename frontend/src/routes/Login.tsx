import axios from "axios";
import "./Login.css";
import { useForm } from "react-hook-form";
import { postAuth } from "../services/postAuth";
import { loginInterface } from "../Interfaces";
import { useNavigate } from "react-router-dom";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginInterface>();

    const navigate = useNavigate();
    return (
        <form
            className="login-container"
            onSubmit={handleSubmit(async (data) => {
                await postAuth(data);
                navigate("/");
            })}
        >
            <h2>Login</h2>
            <input
                {...register("user", { required: true })}
                id="user"
                type="text"
                placeholder="Username"
            />
            <input
                {...register("password", { required: true })}
                id="password"
                type="password"
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
