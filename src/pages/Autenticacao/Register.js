import styles from "./Register.module.css";
import { useState, useEffect } from "react";

const Register = () => {
  
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if(password !== confirmPassword){
      setError("as senhas precisam ser iguais!");
      return;
    };

    console.log(user);
  };

  return (
    <div className={styles.register}>
      <h1>Cadastrar-se</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} name="displayName" required placeholder="nome do usário"/>
        </label>

        <label>
          <span>Email:</span>
          <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" value={email} required placeholder="email do uusário"/>
        </label>

        <label>
          <span>Senha:</span>
          <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" value={password} required placeholder="insira sua senha"/>
        </label>

        <label>
          <span>Confirme sua senha:</span>
          <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} name="confirPassword" value={confirmPassword} required placeholder="confirme a sua senha"/>
        </label>

        <button className="btn">Cadastrar-se</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register