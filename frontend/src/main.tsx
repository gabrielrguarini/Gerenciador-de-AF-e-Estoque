import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CadastroNota from "./routes/CadastroNota";
import Notas from "./routes/Notas";
import Nota from "./routes/Nota";
import ErrorPage from "./routes/ErrorPage";
import Produtos from "./routes/Produtos";
import Login from "./routes/Login";
import Registro from "./routes/Registro";

import { isAuth } from "./auth/isAuth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: isAuth() ? <CadastroNota /> : <Login />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/registro",
                element: <Registro />,
            },
            {
                path: "/notas",
                element: isAuth() ? <Notas /> : <Login />,
            },
            {
                path: "/produtos",
                element: isAuth() ? <Produtos /> : <Login />,
            },
            {
                path: "notas/:notaId",
                element: isAuth() ? <Nota /> : <Login />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
