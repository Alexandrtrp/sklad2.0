import { useState, ChangeEvent, FormEvent } from "react";
import "./Registration.css";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../services/authSlice";
import { useNavigate } from "react-router";
import { AppDispatch } from "../../services/store";

export const Registration: React.FC = () => {
  const [saveLogin, setSaveLogin] = useState<string>("");
  const [savePassword, setSavePassword] = useState<string>("");
  const [saveName, setSaveName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setError(null); // сбрасываем ошибку при вводе
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!saveName.trim() || !saveLogin.trim() || !savePassword.trim()) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    dispatch(addNewUser({ login: saveLogin, password: savePassword, name: saveName }));
    navigate("/", { replace: true });
  };

  return (
    <div className="formwrapper">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          className="input"
          placeholder="Придумайте имя"
          value={saveName}
          onChange={handleInputChange(setSaveName)}
        />
        <input
          type="text"
          className="input"
          placeholder="Придумайте логин"
          value={saveLogin}
          onChange={handleInputChange(setSaveLogin)}
        />
        <input
          type="text"
          className="input"
          placeholder="Придумайте пароль"
          value={savePassword}
          onChange={handleInputChange(setSavePassword)}
        />
        {error && <p className="errorMessage">{error}</p>}
        <button className="formButton" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};