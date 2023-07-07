import axios from "axios";
import { useEffect, useState } from "react";
import { notaInterface } from "../Interfaces";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function Notas() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [notas, setNotas] = useState<notaInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await axios("http://localhost:3000/notas");
                setNotas(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
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
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ height: "100vh", width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowHeight={30}
                        onRowClick={(rowData) =>
                            navigate(`/notas/${rowData.id}`)
                        }
                    />
                </div>
            )}
        </div>
    );
}
export default Notas;
