import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import MainRoutes from './routes/mainRoutes';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainRoutes />
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
