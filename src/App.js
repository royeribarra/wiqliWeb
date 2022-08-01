import './App.css';
import Header from './components/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/home';
import Datos from './pages/datos/datos';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header></Header>
      {/* <Home></Home> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/datos" element={<Datos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
