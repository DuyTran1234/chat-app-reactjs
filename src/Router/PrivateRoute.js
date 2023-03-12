import { Navigate } from "react-router-dom";
import { isAuth } from "../service/checkLogin";

export default function PrivateRoute({ children }) {
    if (!isAuth()) {
        return <Navigate to="/login" replace />
    }
    return children;
}