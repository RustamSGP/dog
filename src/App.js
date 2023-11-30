import "./App.css";
import AppProvider from "./context/AppContext.js";
import Home from "./components/Home.jsx";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Home />
      </div>
      ;
    </AppProvider>
  );
}

export default App;
