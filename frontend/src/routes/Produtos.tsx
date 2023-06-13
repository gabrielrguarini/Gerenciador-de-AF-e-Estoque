import axios from "axios";
import { useEffect, useState } from "react";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { produtoInterface } from "../Interfaces";

function Produtos() {
    const [isLoading, setIsLoading] = useState(false);
    const [produtos, setProdutos] = useState<produtoInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:3000/produtos"
                );
                setProdutos(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    const rows: GridRowsProp = produtos.map((produto) => {
        return {
            id: produto.id,
            col1: produto.nome,
            col2: `${parseFloat(produto.quantidade).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
            col3: `${parseFloat(produto.custo).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
            })}`,
            col4: `R$ ${(
                parseFloat(produto.custo) * parseFloat(produto.quantidade)
            ).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
            })}`,
            col5: produto.status,
        };
    });
    const columns: GridColDef[] = [
        { field: "col1", headerName: "Column 1", width: 150 },
        { field: "col2", headerName: "Column 2", width: 150 },
        { field: "col3", headerName: "Column 3", width: 150 },
        { field: "col4", headerName: "Column 4", width: 150 },
    ];

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ height: 300, width: "100%" }}>
                    <DataGrid rows={rows} columns={columns} />
                </div>
            )}
        </div>
    );
}
export default Produtos;
