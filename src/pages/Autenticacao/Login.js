import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //hooks
  const { login, error: authError, loading } = useAuthentication();


  const clearStatesValues = () => {
    setEmail("");
    setPassword("");
  };

  //sempre quando o state "authEror" sofrer alteração executa a function
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const response = await login(user);

    if (response) {
      clearStatesValues();
    }
  };

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Entre para utilizar o sistema</p>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Email:</span>
          <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" value={email} required placeholder="email do uusário" />
        </label>

        <label>
          <span>Senha:</span>
          <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" value={password} required placeholder="insira sua senha" />
        </label>

        {!loading && <button className="btn">Entrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login