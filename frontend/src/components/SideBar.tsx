import "./SideBar.css";
import { FaClipboardList, FaListUl } from "react-icons/fa";
import { BsClipboardPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();
    return (
        <aside className="sidebar">
            <div className="logo">
                <h1>OrderFlow</h1>
            </div>
            <div className="navbar">
                <div
                    className="navbar-item"
                    onClick={() => {
                        navigate(`/`);
                    }}
                >
                    <BsClipboardPlusFill size={"24px"} />
                    <p>Cadastrar</p>
                </div>
                <div
                    className="navbar-item"
                    onClick={() => {
                        navigate(`/notas`);
                    }}
                >
                    <FaClipboardList size={"24px"} />
                    <p>Notas</p>
                </div>
                <div
                    className="navbar-item"
                    onClick={() => {
                        navigate(`/produtos`);
                    }}
                >
                    <FaListUl size={"24px"} />
                    <p>Produtos</p>
                </div>
            </div>
        </aside>
    );
}

export default SideBar;
