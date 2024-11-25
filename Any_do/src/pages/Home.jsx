import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.svg";

const Home = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [statusOptions] = useState([
    { value: "a_fazer", label: "A Fazer" },
    { value: "fazendo", label: "Fazendo" },
    { value: "pronto", label: "Pronto" },
  ]);
  const [filteredTasks, setFilteredTasks] = useState([]); // Estado para as tarefas filtradas
  const [selectedStatus, setSelectedStatus] = useState("todos"); // Estado para o status selecionado

  // Função para buscar os usuários
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users/");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Função para buscar as tarefas
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  // Chama as funções quando o componente é montado
  useEffect(() => {
    fetchUsuarios();
    fetchTasks();
  }, []);

  // Atualiza filteredTasks quando tasks mudarem
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  // Função para filtrar as tarefas pelo status
  const filterTasksByStatus = (status) => {
    setSelectedStatus(status);
    if (status === "todos") {
      setFilteredTasks(tasks); // Exibe todas as tarefas
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered); // Exibe as tarefas com o status selecionado
    }
  };

  // Função para atualizar o status da tarefa
  const handleStatusChange = async (taskId, newStatus) => {
    console.log("ID da Tarefa:", taskId);
    console.log("Novo Status:", newStatus);

    // Encontre a tarefa que será atualizada
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      console.error("Tarefa não encontrada!");
      return;
    }

    try {
      // Enviar o objeto completo com o novo status
      const updatedTask = {
        ...taskToUpdate, // Copia todos os campos da tarefa
        status: newStatus, // Atualiza apenas o status
      };

      await axios.put(
        `http://127.0.0.1:8000/api/tasks/${taskId}/`,
        updatedTask
      );

      // Atualiza a lista localmente
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );

      alert("Status da tarefa atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
      alert(
        "Erro ao atualizar o status. Verifique os dados e tente novamente."
      );
    }
  };

  // Função para excluir a tarefa
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/del/${taskId}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      alert("Tarefa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
      alert("Erro ao excluir a tarefa. Tente novamente.");
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

      {/* Botões de Filtro */}
      <div style={styles.buttonContainer}>
        <button
          onClick={() => filterTasksByStatus("todos")}
          style={
            selectedStatus === "todos"
              ? styles.activeFilterButton
              : styles.filterButton
          }
        >
          Todos
        </button>
        <button
          onClick={() => filterTasksByStatus("fazendo")}
          style={
            selectedStatus === "todos"
              ? styles.activeFilterButton
              : styles.filterButton
          }
        >
          Fazendo
        </button>
        <button
          onClick={() => filterTasksByStatus("a_fazer")}
          style={
            selectedStatus === "todos"
              ? styles.activeFilterButton
              : styles.filterButton
          }
        >
          A Fazer
        </button>
        <button
          onClick={() => filterTasksByStatus("pronto")}
          style={
            selectedStatus === "todos"
              ? styles.activeFilterButton
              : styles.filterButton
          }
        >
          Pronto
        </button>
      </div>

      <div style={styles.gridContainer}>
        {filteredTasks.map((task) => (
          <div key={task.id} style={styles.taskCard}>
            <h3>
              <strong style={{ color: "#00629A" }}>Descrição:</strong>{" "}
              {task.descricao}
            </h3>
            <p>
              <strong style={{ color: "#00629A" }}>Setor:</strong> {task.setor}
            </p>
            <p>
              <strong style={{ color: "#00629A" }}>Prioridade:</strong>{" "}
              {task.prioridade}
            </p>
            <p>
              <strong style={{ color: "#00629A" }}>Usuário:</strong>{" "}
              {task.username}
            </p>
            <p>
              <strong style={{ color: "#00629A" }}>Data de Cadastro:</strong>{" "}
              {new Date(task.data_cadastro).toLocaleDateString()}
            </p>
            {/* Status editável */}
            <div style={styles.statusContainer}>
              <label>
                <strong style={{ color: "#00629A" }}>Status:</strong>
              </label>
              <select
                value={task.status} // Exibe o status atual da tarefa
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setTasks((prevTasks) =>
                    prevTasks.map((t) =>
                      t.id === task.id ? { ...t, status: newStatus } : t
                    )
                  );
                }}
                style={styles.statusDropdown}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleStatusChange(task.id, task.status)} // Usa o status da tarefa
                style={styles.updateButton}
              >
                Alterar status
              </button>
            </div>
            <button
              onClick={() => navigate(`/atualizar-atividade/${task.id}`)} // Navega para a página de edição
              style={styles.updateButton}
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)} // Exclui a tarefa
              style={styles.deleteButton}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    margin: "20px 0",
  },
  filterButton: {
    padding: "15px 50px",
    backgroundColor: "#333", // Cor mais escura para o botão normal
    color: "#FFFFFF",
    border: "2px solid transparent",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  activeFilterButton: {
    padding: "15px 50px",
    backgroundColor: "#D4D4D4", // Cor do botão ativo
    color: "#000000",
    border: "2px solid #333",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra para destacar
    transition: "all 0.3s ease-in-out",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Responsivo, com cards ajustando o tamanho
    gap: "50px", // Espaçamento entre os cards
    padding: "20px", // Maior espaçamento ao redor da grid
    justifyItems: "center", // Centraliza os cards na tela
  },
  taskCard: {
    padding: "20px",
    backgroundColor: "#FFFFFF", // Fundo branco para os cards
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)", // Sombra suave para dar profundidade
    transition: "transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out", // Animação suave no hover
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "auto",
    width: "100%",
    minHeight: "250px",
    cursor: "pointer", // Indica que o card é interativo
  },
  taskCardHover: {
    transform: "scale(1.05)", // Aumenta o card ao passar o mouse
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", // Aumenta a sombra no hover
  },
  taskTitle: {
    fontSize: "1.3rem", // Tamanho de fonte maior para títulos
    fontWeight: "700", // Negrito para destacar
    color: "#000000", // Cor escura para bom contraste
    marginBottom: "5px", // Espaçamento inferior
  },
  taskDetails: {
    fontSize: "1rem", // Tamanho de fonte médio
    color: "#000000", // Cor de texto mais suave
    marginTop: "7px", // Espaçamento superior
  },
  statusContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "20px",
  },
  statusLabel: {
    fontWeight: "600",
    color: "#00629A", // Cor do rótulo de status
    marginBottom: "5px",
  },
  statusDropdown: {
    padding: "8px 16px", // Tamanho confortável para o dropdown
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    fontSize: "1rem",
    color: "#333",
    width: "100%",
    transition: "background-color 0.3s",
  },
  statusDropdownHover: {
    backgroundColor: "#F7F7F7", // Mudança de cor no hover
  },
  updateButton: {
    padding: "8px 18px",
    backgroundColor: "#00629A", // Azul moderno
    color: "#FFFFFF",
    border: "none",
    fontWeight: "600", // Texto em negrito
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "15px",
  },
  updateButtonHover: {
    backgroundColor: "#005687", // Cor mais escura ao passar o mouse
  },
  deleteButton: {
    padding: "8px 18px",
    backgroundColor: "#ED0007", // Vermelho forte para excluir
    color: "#FFFFFF",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "8px",
  },
  deleteButtonHover: {
    backgroundColor: "#B80605", // Cor mais escura ao passar o mouse
  },
  taskInfo: {
    marginBottom: "15px", // Margem inferior para os detalhes das tarefas
  },
};

export default Home;
