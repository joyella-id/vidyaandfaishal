import "./App.scss";
import Home from "./Pages/Home";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "./Utils/context";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AppContextProvider>
      <ToastContainer />
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
