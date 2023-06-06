import { useEffect, useState } from "react";
import {
    Container,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    OutlinedInput,
    InputAdornment,
    Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import TabelaDeProdutos from "../components/TabelaDeProdutos";

import { notaInterface, produtosInterface, rowInterface } from "../Interfaces";

import { postNota } from "../services/postNota";

function CadastroNota() {
    const [afNumber, setAfNumber] = useState("");
    const [cidade, setcidade] = useState("");
    const [listaProdutos, setListaProdutos] = useState<rowInterface[]>([]);
    const [nota, setNota] = useState<notaInterface>({
        afNumber: "",
        cidade: "",
        listaProdutos: [],
    });

    const handlecidadeChange = (event: SelectChangeEvent) => {
        setcidade(event.target.value as string);
    };
    const handleAfNumberChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setAfNumber(event.target.value as string);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<produtosInterface>();

    const addNota = ({ afNumber, cidade, listaProdutos }: notaInterface) => {
        setNota(() => {
            return { afNumber, cidade, listaProdutos };
        });
        postNota(nota);
    };

    const addProduto = ({
        name,
        quantidade,
        custo,
        status,
    }: produtosInterface) => {
        const custoTotal = `${parseFloat(custo) * parseFloat(quantidade)}`;
        setListaProdutos([
            ...listaProdutos,
            {
                id: listaProdutos.length,
                name,
                quantidade,
                custo,
                status,
                custoTotal,
            },
        ]);
    };

    useEffect(() => {
        setNota(() => {
            return { afNumber, cidade, listaProdutos };
        });
    }, [listaProdutos]);

    return (
        <div className="CadastroNota">
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={8}>
                        <TextField
                            size="small"
                            fullWidth
                            id="AFNumber"
                            label="Numero da AF"
                            variant="outlined"
                            onChange={handleAfNumberChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl margin="none" fullWidth size="small">
                            <InputLabel id="cidade-label">Cidade</InputLabel>
                            <Select
                                sx={{ minWidth: 120 }}
                                labelId="cidade-label"
                                id="cidade"
                                value={cidade}
                                label="Cidade"
                                onChange={handlecidadeChange}
                            >
                                <MenuItem value={"Espera Feliz"}>
                                    Espera Feliz
                                </MenuItem>
                                <MenuItem value={"Carangola"}>
                                    Carangola
                                </MenuItem>
                                <MenuItem value={"Pedra Dourada"}>
                                    Pedra Dourada
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TabelaDeProdutos
                            rows={listaProdutos}
                        ></TabelaDeProdutos>
                    </Grid>
                    <Container disableGutters>
                        <form onSubmit={handleSubmit(addProduto)}>
                            <Grid
                                container
                                spacing={1}
                                sx={{ marginTop: 1, padding: 0 }}
                            >
                                <Grid item xs={5}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="itemName"
                                        {...register("name")}
                                        label="Nome do Item"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        size="small"
                                        type={"number"}
                                        fullWidth
                                        id="itemQuantity"
                                        {...register("quantidade")}
                                        label="Quantidade"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl size="small">
                                        <InputLabel htmlFor="outlined-adornment-amount">
                                            Custo
                                        </InputLabel>
                                        <OutlinedInput
                                            type="number"
                                            {...register("custo")}
                                            id="outlined-adornment-amount"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            }
                                            label="Custo"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl
                                        margin="none"
                                        fullWidth
                                        size="small"
                                    >
                                        <InputLabel id="status-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            defaultValue=""
                                            {...register("status")}
                                            sx={{ minWidth: 120 }}
                                            labelId="status-label"
                                            id="status"
                                            label="Status"
                                        >
                                            <MenuItem value={"Nenhum"}>
                                                Nenhum
                                            </MenuItem>
                                            <MenuItem value={"Comprar"}>
                                                Comprar
                                            </MenuItem>
                                            <MenuItem value={"Em Estoque"}>
                                                Em Estoque
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} sx={{ marginTop: 0.5 }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="small"
                                        variant="contained"
                                    >
                                        +
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Grid>
                <Button
                    type="button"
                    fullWidth
                    size="small"
                    variant="contained"
                    onClick={() => addNota({ afNumber, cidade, listaProdutos })}
                >
                    Enviar lista de produtos
                </Button>
            </Container>
        </div>
    );
}

export default CadastroNota;
