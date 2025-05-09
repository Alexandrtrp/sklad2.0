import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../services/authSlice";
import { AppDispatch } from "../../services/store"; // Убедись, что AppDispatch определён в store

export const Logout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <button
      className="logoutButton"
      onClick={() => {
        navigate("/", { replace: false });
        dispatch(logout());
      }}
    >
      Logout
    </button>
  );
};