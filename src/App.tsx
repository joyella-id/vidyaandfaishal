import "./App.scss";
import Home from "./Pages/Home";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContextProvider, GyroscopeContextProvider } from "./Utils/context";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AppContextProvider>
      <GyroscopeContextProvider>
        <ToastContainer />
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </GyroscopeContextProvider>
    </AppContextProvider>
  );
}

export default App;
