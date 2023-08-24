import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet, Route, Routes as Router } from "react-router-dom";

import Login from "../pages/login/Login";
import CadastroNota from "../pages/cadastroNota/CadastroNota";
import Notas from "../pages/notas/Notas";
import Nota from "../pages/nota/Nota";
import Produtos from "../pages/produtos/Produtos";
import Registro from "../pages/registro/Registro";

function PrivateRoutes() {
    const { auth } = useContext(AuthContext);
    if (!auth) {
        return <Navigate to={"/login"} replace />;
    }
    return <Outlet />;
}

export default function Routes() {
    return (
        <Router>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<CadastroNota />} />
                <Route path="/notas" element={<Notas />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/notas/:notaId" element={<Nota />} />
            </Route>
        </Router>
    );
}
