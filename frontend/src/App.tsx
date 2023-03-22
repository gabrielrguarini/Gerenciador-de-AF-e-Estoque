import { useState } from "react";
import {
    Box,
    Container,
    TextField,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import TabelaDeProdutos from "./components/TabelaDeProdutos";
import { rowInterface } from "./Interfaces";

function App() {
    const [city, setCity] = useState("");

    const handleCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };

    const linhas = [
        { name: "gabriel", quantidade: 2 },
        { name: "Iara <3", quantidade: 3 },
    ];

    return (
        <div className="App">
            <Container maxWidth="lg">
                <Box>
                    <TextField
                        id="AFNumber"
                        label="Numero da AF"
                        variant="outlined"
                    />
                    <FormControl>
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
                            <MenuItem value={"Carangola"}>Carangola</MenuItem>
                            <MenuItem value={"Pedra Dourada"}>
                                Pedra Dourada
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TabelaDeProdutos rows={linhas}></TabelaDeProdutos>
            </Container>
        </div>
    );
}

export default App;
