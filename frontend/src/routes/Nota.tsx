import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Nota.css";
import { notaInterface } from "../Interfaces";
import TabelaNota from "../components/TabelaNota";

function Nota() {
    const [nota, setNota] = useState<notaInterface | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const { notaId } = useParams();
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
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
        nota && (
            <div className="nota-container">
                <header className="nota-header">
                    <h1>Ordem de fornecimento</h1>
                    <div className="nota-info">
                        <p>Cidade: {nota.cidade}</p>
                        <p>Nota: {nota.afNumber}</p>
                    </div>
                </header>
                {isLoading ? (
                    <div>Carregando...</div>
                ) : (
                    <TabelaNota produtos={nota.produtos} />
                )}
                <footer className="nota-footer">
                    Total de: {nota.produtos.length} produtos
                </footer>
            </div>
        )
    );
}
export default Nota;
