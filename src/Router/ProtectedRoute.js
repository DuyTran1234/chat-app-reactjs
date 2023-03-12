import { Navigate } from "react-router-dom";
import { isAuth } from "../service/checkLogin";

export function ProtectedRoute({ children }) {
    if (isAuth()) {
        return <Navigate to="/chat-app" replace />
    }
    return children;
}