import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import styles from "./styles.module.scss";

export function AuthPage() {
  const [auth, setAuth] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { onAuth } = useContext(AuthContext);

  let titles = {
    login: "Iniciar Sesión",
    register: "Registrarse",
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { email, password } = form;
    const response: any = await onAuth({ email, password, auth });

    if (response.ok) {
      navigate("/home");
    }
  };

  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>Gestify</h1>
      <div className={styles.col}>
        <div className={styles.switches}>
          <Switch
            title="Iniciar Sesión"
            onSwitch={() => setAuth("login")}
            isActive={auth === "login"}
          />
          <Switch
            title="Registrarse"
            onSwitch={() => setAuth("register")}
            isActive={auth === "register"}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <h3>{titles[auth]}</h3>
          <div className={styles.inputs}>
            <Input
              label="Email"
              name="email"
              type="text"
              value={form.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button>{titles[auth]}</button>
        </form>
      </div>
    </div>
  );
}

interface SwitchProps {
  onSwitch: () => void;
  title: string;
  isActive: boolean;
}

function Switch({ onSwitch, title, isActive }: SwitchProps) {
  return (
    <div
      className={`${isActive && styles.isActive} ${styles.switch}`}
      onClick={onSwitch}
    >
      {title}
    </div>
  );
}

interface InputProps {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, type, value, name, onChange }: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
