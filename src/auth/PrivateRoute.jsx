import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
    const { isAuth, loading } = useAuth();
    const location = useLocation();
    if (loading) return <p style={{ padding: 24 }}>Cargando…</p>;
    return isAuth ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
