import styles from "./Register.module.css";
import { useState, useEffect } from "react";

const Register = () => {
  return (
    <div>
      <h1>Cadastrar-se</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form>
        <label>
          <span>Nome:</span>
          <input type="text" name="displayName" required placeholder="nome do usário"/>
        </label>

        <label>
          <span>Email:</span>
          <input type="email" name="email" required placeholder="email do uusário"/>
        </label>

        <label>
          <span>Senha:</span>
          <input type="password" name="password" required placeholder="insira sua senha"/>
        </label>

        <label>
          <span>Confirme sua senha:</span>
          <input type="password" name="confirPassword" required placeholder="confirme a sua senha"/>
        </label>

        <button className="btn">Cadastrar-se</button>
      </form>
    </div>
  )
}

export default Register