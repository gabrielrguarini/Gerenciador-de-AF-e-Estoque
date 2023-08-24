import React, { ReactNode, createContext, useEffect, useState } from "react";
const token = localStorage.getItem("token");

interface AuthContextProps {
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
    auth: false,
    setAuth: () => false,
});

function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (token) {
            setAuth(true);
        }
        setLoading(false);
    }, [token]);

    if (loading) {
        return <h1>Loading...</h1>;
    }
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
