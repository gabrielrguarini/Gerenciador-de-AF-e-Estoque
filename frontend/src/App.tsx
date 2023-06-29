import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <CssBaseline>
                <div className="App">
                    <Outlet />
                </div>
            </CssBaseline>
        </>
    );
}

export default App;
