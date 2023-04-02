import { useState } from "react";
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
import axios from "axios";
import TabelaDeProdutos from "./components/TabelaDeProdutos";
import { produtosInterface, rowInterface } from "./Interfaces";

function App() {
    const [city, setCity] = useState("");
    const handleCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<produtosInterface>();

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
        console.log(listaProdutos);
    };

    const postLista = (listaProdutos: rowInterface[]) => {
        axios.post(" http://localhost:3000/", listaProdutos);
    };

    const [listaProdutos, setListaProdutos] = useState<rowInterface[]>([]);

    return (
        <div className="App">
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
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl margin="none" fullWidth size="small">
                            <InputLabel id="city-label">Cidade</InputLabel>
                            <Select
                                sx={{ minWidth: 120 }}
                                labelId="city-label"
                                id="city"
                                value={city}
                                label="Cidade"
                                onChange={handleCityChange}
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
                    onClick={() => postLista(listaProdutos)}
                >
                    Enviar lista de produtos
                </Button>
            </Container>
        </div>
    );
}

export default App;
