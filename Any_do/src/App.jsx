import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Apresentacao from './pages/Apresentacao';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import NovaAtividade from './pages/NovaAtividade';
import AtualizarAtividade from './pages/task';
import Home from './pages/Home';
import './styles/global.css'; // Estilos globais

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Apresentacao />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nova-atividade" element={<NovaAtividade />} />
        <Route path="/atualizar-atividade/:id" element={<AtualizarAtividade />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
