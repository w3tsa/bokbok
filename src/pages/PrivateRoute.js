import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  //   const navigate = useNavigate();
  return user ? children : <Navigate to="/login" />;
}
