import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import "./App.css";

function App() {
    return (
        <div className="App">
            <SideBar />
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
