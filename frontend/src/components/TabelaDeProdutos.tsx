import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import axios from "axios";
import { produtoInterface } from "../Interfaces";
interface propsInterface {
    rows: produtoInterface[];
}
export default function TabelaDeProdutos({ rows }: propsInterface) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Custo</TableCell>
                        <TableCell align="right">Custo Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            hover
                            role="checkbox"
                            key={row.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell component="th" align="right">
                                {row.quantidade}
                            </TableCell>
                            <TableCell component="th" align="right">
                                {row.custo}
                            </TableCell>
                            <TableCell component="th" align="right">
                                {parseFloat(row.custo) *
                                    parseFloat(row.quantidade)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
