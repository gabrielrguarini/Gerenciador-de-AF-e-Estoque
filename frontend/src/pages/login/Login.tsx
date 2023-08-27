import "./Login.css";
import { useForm } from "react-hook-form";
import { postAuth } from "../../services/postAuth";
import { loginInterface } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginInterface>();

    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    useEffect(() => {
        if (auth) {
            return navigate("/");
        }
    });
    return (
        <form
            className="login-container"
            onSubmit={handleSubmit(async (data) => {
                try {
                    const token = await postAuth(data);
                    if (token) {
                        setAuth(true);
                        localStorage.setItem("token", token.token);
                    }
                    navigate("/");
                    return;
                } catch (error) {
                    console.error(error);
                }
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
            <button
                onClick={() => {
                    navigate("/registro");
                }}
            >
                Registrar
            </button>
        </form>
    );
}

export default Login;
