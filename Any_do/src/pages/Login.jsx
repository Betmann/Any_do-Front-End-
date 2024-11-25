import { useState } from "react";
import "../styles/Cadastro.css";  
import { Link } from "react-router-dom";  
import Logo from "../assets/Logo.svg";  

function Login() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Login realizado com sucesso!");
  };

  return (
    <div className="Cadastro"> 
      <header className="cadastroHeader"> 
        <div className="logo">
          <img src={Logo} alt="Logo Any.do" className="LogoAnyDo" />
        </div>
        <nav className="Cadastronavbar">
          <div className="navbarnav">
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
        <h2>Login</h2> 
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Digite seu nome"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <button type="submit" className="botaoCadastrar">
              Entrar
            </button>
          </div>
        </form>
        <div className="linkCadastro">
          <p>Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
