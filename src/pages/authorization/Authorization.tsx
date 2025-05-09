import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthCheck } from "../../services/authSlice";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../services/store";
import "./Auth.css";

export const Auth = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const navigate = useNavigate();

  useEffect(() => {
    isAuth
      ? navigate("main", { replace: false })
      : navigate("/", { replace: false });
  }, [isAuth, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="auth">
      <h2>Форма авторизации</h2>
      <form onSubmit={handleSubmit} className="authForm">
        <input
          className="input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          placeholder="Логин"
        />
        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Пароль"
        />
        <div className="authButtonWrapper">
          <button
            className="formButton"
            onClick={() => {
              dispatch(isAuthCheck({ login: login, password: password }));
            }}
          >
            Вход
          </button>
          <button
            className="formButton"
            type="button"
            onClick={() => navigate("/registration", { replace: true })}
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
};
