import { useState } from "react";
import "../styles/Cadastro.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.svg";

function Cadastro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [msn, setMsn] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/", {
        username,
        email,
      });
      console.log("Usuário cadastrado:", response.data);
      setMsn("Cadastro concluído com sucesso!!!");
      setUsername("");
      setEmail("");
    } catch (error) {
      console.log("Username: ", username);
      console.log("Email: ", email);
      console.error("Erro ao cadastrar usuário:", error);
      setMsn("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="Cadastro">
      <header className="cadastroHeader">
        <div className="logo">
          <img src={Logo} alt="Logo Any.do" className="LogoAnyDo" />
        </div>
        <nav className="Cadastronavbar">
          <div className="navbarnav">
            {/* Usando Link para navegação */}
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/cadastro" className="navbar-link">
              Cadastro
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/nova-atividade" className="navbar-link">
              Nova
            </Link>
            <Link to="/atualizar-atividade" className="navbar-link">
              Editar
            </Link>
            <Link to="/home" className="navbar-link">
              Atividades
            </Link>
          </div>
        </nav>
      </header>

      <div className="cadastroContainer">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Nome:</label>
            <input
              type="text"
              id="username"
              placeholder="Digite seu nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <button type="submit" className="botaoCadastrar">
              Cadastrar
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ color: "black" }}>{msn}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
