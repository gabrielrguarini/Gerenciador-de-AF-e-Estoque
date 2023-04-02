export interface rowInterface {
    id?: number;
    name: string;
    quantidade: string;
    custo: string;
    custoTotal: string;
    status: "Nenhum" | "Comprar" | "Em Estoque";
}
export interface produtosInterface {
    name: string;
    quantidade: string;
    custo: string;
    status: "Nenhum" | "Comprar" | "Em Estoque";
}
