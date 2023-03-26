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
import TabelaDeProdutos from "./components/TabelaDeProdutos";

function App() {
    const [city, setCity] = useState("");
    const [status, setStatus] = useState("");

    const handleCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };
    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const linhas = [
        { name: "gabriel", quantidade: "2", custo: "100", custoTotal: "" },
        { name: "Iara <3", quantidade: "3", custo: "100", custoTotal: "" },
    ];

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
                        <TabelaDeProdutos rows={linhas}></TabelaDeProdutos>
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            size="small"
                            fullWidth
                            id="itemName"
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
                            label="Quantidade"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl sx={{ m: 1 }} size="small">
                            <InputLabel htmlFor="outlined-adornment-amount">
                                Custo
                            </InputLabel>
                            <OutlinedInput
                                type="number"
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
                        <FormControl margin="none" fullWidth size="small">
                            <InputLabel id="city-label">Status</InputLabel>
                            <Select
                                sx={{ minWidth: 120 }}
                                labelId="status-label"
                                id="status"
                                value={status}
                                label="Status"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value={"Nenhum"}>Nenhum</MenuItem>
                                <MenuItem value={"Comprar"}>Comprar</MenuItem>
                                <MenuItem value={"Em Estoque"}>
                                    Em Estoque
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth size="small" variant="contained">
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
