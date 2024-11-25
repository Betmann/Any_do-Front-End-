import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Apt from "../assets/Apt.svg";
import "../styles/Apresentacao.css";

function Apresentacao() {
  return (
    <div className="apresentacao">
      <header className="apresentacaoheader">
        <div className="logo">
          <img src={Logo} alt="Logo Any.do" className="LogoAnyDo" />
        </div>
        <div className="header-buttons">
          <Link to="/cadastro" className="btn">
            Cadastro
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </header>

      <main className="apresentacao-content">
        <div className="content-left">
          <h1>Listas de tarefas simples. Minimalista e sem distrações.</h1>
          <p>Apenas o essencial para você focar no que importa.</p>
        </div>
        <div className="content-right">
          <img
            src={Apt}
            alt="Organização de tarefas"
            className="content-image"
          />
        </div>

        <div className="content-center">
          <Link to="/cadastro" className="btn-start">
            Começar
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Apresentacao;
