import { useState, useEffect } from "react"; 
import "../styles/NovaAtividade.css";  // Usando o mesmo CSS
import { Link } from "react-router-dom"; // Importando Link para navegação
import axios from "axios";
import Logo from "../assets/Logo.svg";  // Logo da aplicação

function NovaAtividade() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    usuario: "",
    descricao: "",
    setor: "",
    prioridade: "baixa",
    status: "a_fazer",
  });

  // Carrega a lista de usuários da API quando o componente é montado
  useEffect(() => {
    axios.get("http://localhost:8000/api/users/")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao carregar usuários:", error));
  }, []);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  // Função para enviar os dados do formulário para a API
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData)
    axios.post("http://localhost:8000/api/tasks/", formData)
      .then(response => {
        alert("Tarefa cadastrada com sucesso!");
        setFormData({
          usuario: "",
          descricao: "",
          setor: "",
          prioridade: "baixa",
          status: "a_fazer",
        });
      })
      .catch(error => console.error("Erro ao cadastrar tarefa:", error));
  };
  return (
    <div className="NovaAtividade2">
      <header className="NovaAtividadeHeader">
        <div className="logo">
          <img src={Logo} alt="Logo Any.do" className="LogoAnyDo" />
        </div>
        <nav className="NovaAtividadenavbar">
          <div className="NovaAtividadenavbarnav">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/cadastro" className="navbar-link">Cadastro</Link>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/nova-atividade" className="navbar-link">Nova</Link>
            <Link to="/atualizar-atividade" className="navbar-link">Editar</Link>
            <Link to="/home" className="navbar-link">Atividades</Link>
          </div>
        </nav>
      </header>

      <div className="NovaAtividadeContainer">
        <h2>Nova Atividade</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo para escolher o usuário */}
          <div className="inputNovaAtividade">
            <label>Usuário:</label>
            <select name="usuario" value={formData.usuario} onChange={handleChange} required>
            <option value="">Selecione um usuário</option>
            {usuarios.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
          </div>

          {/* Campo de descrição da tarefa */}
          <div className="inputNovaAtividade">
            <label htmlFor="descricao">Descrição da Tarefa:</label>
            <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
          </div>

          {/* Campo para o setor */}
          <div className="inputNovaAtividade">
            <label htmlFor="setor">Setor:</label>
            <input type="text" name="setor" value={formData.setor} onChange={handleChange} required />
          </div>

          {/* Campo de prioridade */}
          <div className="inputNovaAtividade">
            <label htmlFor="prioridade">Prioridade:</label>
            <select name="prioridade" value={formData.prioridade} onChange={handleChange} required>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          {/* Campo de status */}
          <div className="inputNovaAtividade">
            <label htmlFor="status">Status:</label>
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="a_fazer">A fazer</option>
              <option value="fazendo">Fazendo</option>
              <option value="pronto">Pronto</option>
            </select>
          </div>

          {/* Botão Adicionar */}
          <div className="NovaAtividade">
            <button type="submit" className="botaoNovaAtividade">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaAtividade;
