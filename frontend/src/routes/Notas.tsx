import axios from "axios";
import { useEffect, useState } from "react";
import { notaInterface } from "../Interfaces";

function Notas() {
    const [isLoading, setIsLoading] = useState(false);
    const [notas, setNotas] = useState<notaInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await axios("http://localhost:3000/notas");
                const data = response.data;
                setNotas(data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);
    return (
        <div>
            {JSON.stringify(notas)}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    {notas.map((nota) => (
                        <tr key={nota.id}>
                            <td>Cidade: {nota.cidade}</td>
                            <td>Numero: {nota.afNumber}</td>
                        </tr>
                    ))}
                </table>
            )}
        </div>
    );
}
export default Notas;
