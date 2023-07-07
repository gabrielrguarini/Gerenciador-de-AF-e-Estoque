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
            nome: produto.nome,
            quantidade: `${parseFloat(produto.quantidade).toLocaleString(
                "pt-BR",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }
            )}`,
            custo: `${parseFloat(produto.custo).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
            })}`,
            custoTotal: `R$ ${(
                parseFloat(produto.custo) * parseFloat(produto.quantidade)
            ).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
            })}`,
            col5: produto.status,
        };
    });
    const columns: GridColDef[] = [
        { field: "nome", headerName: "Nome do item", width: 300 },
        { field: "quantidade", headerName: "Quantidade", width: 150 },
        { field: "custo", headerName: "Custo", width: 150 },
        { field: "custoTotal", headerName: "Custo Total", width: 150 },
    ];

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ height: "100vh", width: "100%" }}>
                    <DataGrid rows={rows} columns={columns} rowHeight={30} />
                </div>
            )}
        </div>
    );
}
export default Produtos;
