export interface notaInterface {
    id?: string;
    afNumber?: string;
    cidade?: string;
    produtos: produtoInterface[]
}
export interface produtoInterface {
    id: string,
    nome: string,
    quantidade: string,
    custo: string,
    status: string,
    notaId?: string
}

