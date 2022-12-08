import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //hooks
  const {createUser, error: authError, loading} = useAuthentication();


  const clearStatesValues = () =>{
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("as senhas precisam ser iguais!");
      return;
    };

    const response = await createUser(user);

    if(!response.error){
      clearStatesValues();
    }
  };

  //sempre quando o state "authEror" sofrer alteração executa a function
  useEffect(() => {
    if(authError){
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastrar-se</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} name="displayName" required placeholder="nome do usário" />
        </label>

        <label>
          <span>Email:</span>
          <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" value={email} required placeholder="email do uusário" />
        </label>

        <label>
          <span>Senha:</span>
          <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" value={password} required placeholder="insira sua senha" />
        </label>

        <label>
          <span>Confirme sua senha:</span>
          <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} name="confirPassword" value={confirmPassword} required placeholder="confirme a sua senha" />
        </label>

        {!loading && <button className="btn">Cadastrar-se</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register