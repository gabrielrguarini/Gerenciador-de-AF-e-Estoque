export interface rowInterface {
    id?: number;
    name: string;
    quantidade: string;
    custo: string;
    custoTotal: string;
    status: "Nenhum" | "Comprar" | "Em Estoque";
}

export interface notaInterface {
    id?: string;
    afNumber: string;
    cidade: string;
    listaProdutos: produtoInterface[]
}
export interface produtoInterface {
    id: string,
    nome: string,
    quantidade: string,
    custo: string,
    status: string,
    notaId: string
}

