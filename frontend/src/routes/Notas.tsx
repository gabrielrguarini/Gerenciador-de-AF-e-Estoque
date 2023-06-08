import axios from "axios";
import { useEffect, useState } from "react";
import { notaInterface } from "../Interfaces";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

function Notas() {
    const [isLoading, setIsLoading] = useState(false);
    const [notas, setNotas] = useState<notaInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await axios("http://localhost:3000/notas");
                const data = response.data;
                setNotas(data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);
    const rows: GridRowsProp = notas.map((nota) => {
        return {
            id: nota.id,
            col1: nota.afNumber,
            col2: nota.cidade,
        };
    });
    const columns: GridColDef[] = [
        { field: "col1", headerName: "Column 1", width: 150 },
        { field: "col2", headerName: "Column 2", width: 150 },
    ];

    return (
        <div>
            {JSON.stringify(notas)}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ height: 300, width: "100%" }}>
                    <DataGrid rows={rows} columns={columns} />
                </div>
                // <table>
                //     {notas.map((nota) => (
                //         <tr key={nota.id}>
                //             <td>Cidade: {nota.cidade}</td>
                //             <td>Numero: {nota.afNumber}</td>
                //         </tr>
                //     ))}
                // </table>
            )}
        </div>
    );
}
export default Notas;
