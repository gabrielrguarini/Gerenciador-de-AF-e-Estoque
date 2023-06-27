import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Nota() {
    const [nota, setNota] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { notaId } = useParams();
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                console.log("Entrou no TRY");
                const response = await axios(
                    `http://localhost:3000/notas/${notaId}`
                );
                setNota(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <h1>{notaId}</h1>
            <h3>{JSON.stringify(nota)}</h3>
        </>
    );
}
export default Nota;
