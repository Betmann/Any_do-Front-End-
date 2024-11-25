import { useState, useEffect } from "react";
import "../styles/NovaAtividade.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.svg";

const TaskForm = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    usuario: "",
    descricao: "",
    setor: "",
    prioridade: "baixa",
    status: "a_fazer",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setUsuarios(response.data);
        } else {
          console.error("Dados de usuários inválidos");
        }
      })
      .catch((error) => console.error("Erro ao carregar usuários:", error));
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tasks/${id}/`
        );
        if (response.data) {
          const taskData = response.data;
          setTask(taskData);
          setFormData({
            usuario: taskData.usuario || "",
            descricao: taskData.descricao || "",
            setor: taskData.setor || "",
            prioridade: taskData.prioridade || "baixa",
            status: taskData.status || "a_fazer",
          });
          setLoading(false);
        } else {
          console.error("Tarefa não encontrada");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao carregar a tarefa:", error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/tasks/${id}/`, formData)
      .then((response) => {
        alert("Tarefa atualizada com sucesso!");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Erro ao atualizar a tarefa:", error);
        alert("Erro ao atualizar a tarefa. Tente novamente.");
      });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="NovaAtividade2">
      <header className="NovaAtividadeHeader">
        <div className="logo">
          <img src={Logo} alt="Logo Any.do" className="LogoAnyDo" />
        </div>
        <nav className="NovaAtividadenavbar">
          <div className="NovaAtividadenavbarnav">
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

      <div className="NovaAtividadeContainer">
        <h2>Atualizar Atividade</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputNovaAtividade">
            <label>Usuário:</label>
            <select
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
            >
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.username}
                </option>
              ))}
            </select>
          </div>

          <div className="inputNovaAtividade">
            <label htmlFor="descricao">Descrição da Tarefa:</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputNovaAtividade">
            <label htmlFor="setor">Setor:</label>
            <input
              type="text"
              name="setor"
              value={formData.setor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputNovaAtividade">
            <label htmlFor="prioridade">Prioridade:</label>
            <select
              name="prioridade"
              value={formData.prioridade}
              onChange={handleChange}
              required
            >
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          <div className="inputNovaAtividade">
            <label htmlFor="status">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="a_fazer">A fazer</option>
              <option value="fazendo">Fazendo</option>
              <option value="pronto">Pronto</option>
            </select>
          </div>

          <div className="NovaAtividade">
            <button type="submit" className="botaoNovaAtividade">
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
