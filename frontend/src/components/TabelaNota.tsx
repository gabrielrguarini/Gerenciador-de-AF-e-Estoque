import React from "react";
import { notaInterface } from "../Interfaces";

function TabelaNota({ produtos }: notaInterface) {
    return (
        <>
            {!produtos && <h1>Não tem lista</h1>}
            {produtos && (
                <table className="nota-table">
                    <thead>
                        <tr>
                            <th>Nome do Produto</th>
                            <th>Quantidade</th>
                            <th>Custo</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos?.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{produto.quantidade}</td>
                                <td>{`${parseFloat(
                                    produto.custo
                                ).toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                })}`}</td>
                                <td>{produto.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default TabelaNota;
