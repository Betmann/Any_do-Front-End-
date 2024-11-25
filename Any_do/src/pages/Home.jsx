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
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users/");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    fetchTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleStatusChange = async (taskId, newStatus) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      console.error("Tarefa não encontrada!");
      return;
    }

    try {
      const updatedTask = { ...taskToUpdate, status: newStatus };
      await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      alert("Status da tarefa atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
      alert("Erro ao atualizar o status. Verifique os dados e tente novamente.");
    }
  };

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
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/cadastro" className="navbar-link">Cadastro</Link>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/nova-atividade" className="navbar-link">Nova</Link>
            <Link to="/atualizar-atividade" className="navbar-link">Editar</Link>
            <Link to="/home" className="navbar-link">Atividades</Link>
          </div>
        </nav>
      </header>

      <div style={styles.gridContainer}>
        <div style={styles.columnContainer}>
          <h2 style={styles.columnTitle}>A Fazer</h2>
          {tasks
            .filter((task) => task.status === "a_fazer")
            .map((task) => (
              <div key={task.id} style={styles.taskCard}>
                <h3><strong style={{ color: "#00629A" }}>Descrição:</strong> {task.descricao}</h3>
                <p><strong style={{ color: "#00629A" }}>Setor:</strong> {task.setor}</p>
                <p><strong style={{ color: "#00629A" }}>Prioridade:</strong> {task.prioridade}</p>
                <p><strong style={{ color: "#00629A" }}>Usuário:</strong> {task.username}</p>
                <p><strong style={{ color: "#00629A" }}>Data de Cadastro:</strong> {new Date(task.data_cadastro).toLocaleDateString()}</p>

                <div style={styles.statusContainer}>
                  <label><strong style={{ color: "#00629A" }}>Status:</strong></label>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    style={styles.statusDropdown}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.buttonContainer}>
                  <button
                    onClick={() => navigate(`/atualizar-atividade/${task.id}`)}
                    style={styles.updateButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    style={styles.deleteButton}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div style={styles.columnContainer}>
          <h2 style={styles.columnTitle}>Fazendo</h2>
          {tasks
            .filter((task) => task.status === "fazendo")
            .map((task) => (
              <div key={task.id} style={styles.taskCard}>
                <h3><strong style={{ color: "#00629A" }}>Descrição:</strong> {task.descricao}</h3>
                <p><strong style={{ color: "#00629A" }}>Setor:</strong> {task.setor}</p>
                <p><strong style={{ color: "#00629A" }}>Prioridade:</strong> {task.prioridade}</p>
                <p><strong style={{ color: "#00629A" }}>Usuário:</strong> {task.username}</p>
                <p><strong style={{ color: "#00629A" }}>Data de Cadastro:</strong> {new Date(task.data_cadastro).toLocaleDateString()}</p>

                <div style={styles.statusContainer}>
                  <label><strong style={{ color: "#00629A" }}>Status:</strong></label>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    style={styles.statusDropdown}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.buttonContainer}>
                  <button
                    onClick={() => navigate(`/atualizar-atividade/${task.id}`)}
                    style={styles.updateButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    style={styles.deleteButton}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div style={styles.columnContainer}>
          <h2 style={styles.columnTitle}>Pronto</h2>
          {tasks
            .filter((task) => task.status === "pronto")
            .map((task) => (
              <div key={task.id} style={styles.taskCard}>
                <h3><strong style={{ color: "#00629A" }}>Descrição:</strong> {task.descricao}</h3>
                <p><strong style={{ color: "#00629A" }}>Setor:</strong> {task.setor}</p>
                <p><strong style={{ color: "#00629A" }}>Prioridade:</strong> {task.prioridade}</p>
                <p><strong style={{ color: "#00629A" }}>Usuário:</strong> {task.username}</p>
                <p><strong style={{ color: "#00629A" }}>Data de Cadastro:</strong> {new Date(task.data_cadastro).toLocaleDateString()}</p>

                <div style={styles.statusContainer}>
                  <label><strong style={{ color: "#00629A" }}>Status:</strong></label>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    style={styles.statusDropdown}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.buttonContainer}>
                  <button
                    onClick={() => navigate(`/atualizar-atividade/${task.id}`)}
                    style={styles.updateButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    style={styles.deleteButton}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  gridContainer: {
    display: "flex",
    gap: "50px",
    justifyContent: "space-between",
    padding: "20px",
  },
  columnContainer: {
    flex: "1",
    padding: "10px",
  },
  columnTitle: {
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#000000",
    marginBottom: "30px",
  },
  taskCard: {
    padding: "20px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "15px",
  },
  statusContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  statusDropdown: {
    padding: "8px 16px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    fontSize: "1rem",
    color: "#333",
    width: "100%",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center", 
    gap: "10px", 
    marginTop: "15px", 
  },
  updateButton: {
    padding: "8px 18px",
    backgroundColor: "#00629A", 
    color: "#FFFFFF",
    border: "none",
    fontWeight: "600", 
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginBottom: "10px", 
  },
  updateButtonHover: {
    backgroundColor: "#005687",
  },
  deleteButton: {
    padding: "8px 18px",
    backgroundColor: "#ED0007", 
    color: "#FFFFFF",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginBottom: "10px", 
  },
  deleteButtonHover: {
    backgroundColor: "#B80605", 
  },
};

export default Home;
