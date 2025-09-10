import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
    const { isAuth, isAdmin, user, logout } = useAuth();

    return (
        <nav>
            <div><Link to="/">Kodigo Bootcamps</Link></div>
            <div>
                {!isAuth ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Crear cuenta</Link>
                    </>
                ) : (
                    <>
                        <span style={{ marginRight: 12 }}>
                            Hola, {user?.displayName || user?.email}
                            {isAdmin && (
                                <span style={{
                                    marginLeft: 8,
                                    fontSize: 12,
                                    padding: "2px 8px",
                                    borderRadius: 999,
                                    background: "#eef2ff",
                                    color: "#3730a3"
                                }}>
                                    Admin
                                </span>
                            )}
                        </span>
                        {isAdmin && <Link to="/admin">Admin</Link>}
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={logout} style={{ marginLeft: 12 }}>Salir</button>
                    </>
                )}
            </div>
        </nav>
    );
}

