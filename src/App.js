import './App.css';
import Header from './components/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/home';
import Datos from './pages/datos/datos';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Confirmacion from './pages/paginaDeConfirmacion/confirmacion';
import { Provider } from "react-redux";
import store from "./redux/store";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/datos" element={<Datos />} />
            <Route exact path="/confirmacion" element={<Confirmacion />} />
          </Routes>
        </BrowserRouter>
        <ReduxToastr
          className="toastr__modificar"
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          getState={(state) => state.toastr}
          
          progressBar
          closeOnToastrClick
        />
      </div>
    </Provider>
  );
}

export default App;
