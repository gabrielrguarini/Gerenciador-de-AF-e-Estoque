import React from "react";
import { notaInterface } from "../Interfaces";

function TabelaNota({ listaProdutos }: notaInterface) {
    return (
        <>
            {!listaProdutos && <h1>Não tem lista</h1>}
            {listaProdutos && (
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
                        {listaProdutos?.map((produto) => (
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
            {<h1>{JSON.stringify(listaProdutos)}</h1>}
        </>
    );
}

export default TabelaNota;
