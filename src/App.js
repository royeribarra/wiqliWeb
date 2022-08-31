import './App.css';
import Header from './components/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/home';
import Datos from './pages/datos/datos';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Confirmacion from './pages/paginaDeConfirmacion/confirmacion';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/datos" element={<Datos />} />
          <Route exact path="/confirmacion" element={<Confirmacion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
