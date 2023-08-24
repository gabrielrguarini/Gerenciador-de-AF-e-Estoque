import "../login/Login.css";
import { useForm } from "react-hook-form";
import { postRegistro } from "../../services/postRegistro";
import { loginInterface } from "../../Interfaces";

function Registro() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginInterface>();

    return (
        <form
            className="login-container"
            onSubmit={handleSubmit((data) => {
                postRegistro(data);
            })}
        >
            <h2>Registrar</h2>
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
            <button type="submit">Registrar</button>
        </form>
    );
}

export default Registro;
