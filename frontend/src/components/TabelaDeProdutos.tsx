import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { rowInterface } from "../Interfaces";
interface propsInterface {
    rows: rowInterface[];
}
export default function TabelaDeProdutos({ rows }: propsInterface) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table"></Table>
            <TableHead>
                <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">COLUNA 2</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        hover
                        role="checkbox"
                        key={row.name}
                        sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                        }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.quantidade}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
    );
}
