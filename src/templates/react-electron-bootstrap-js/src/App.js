import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [appName, setAppName] = useState("");

  useEffect(() => {
    setAppName(window.electronAPI.getAppDetails());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src</code> to work with react.
        </p>
        <p>
          Edit <code>public/electron</code> to work electron.
        </p>
        <p>
          Backend is up and running at http://localhost:5001 and it shows{" "}
          <code>{appName}</code>
        </p>
        <a
          style={{
            padding: "0.5rem",
            margin: "0.25rem",
            backgroundColor: "#3B82F6",
            borderRadius: "0.25rem",
            color: "white",
          }}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          style={{
            padding: "0.5rem",
            margin: "0.25rem",
            backgroundColor: "#8B5CF6",
            borderRadius: "0.25rem",
            color: "white",
          }}
          href="https://www.electronjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Electron
        </a>

        <a
          style={{
            padding: "0.5rem",
            margin: "0.25rem",
            backgroundColor: "#EC4899",
            borderRadius: "0.25rem",
            color: "white",
          }}
          href="https://react-bootstrap.github.io/getting-started/introduction"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Bootstrap
        </a>
        <button
          onClick={() => fetch("http://localhost:5001/close-app")}
          style={{
            padding: "0.5rem",
            margin: "0.25rem",
            backgroundColor: "#6B7280",
            borderRadius: "0.25rem",
            color: "white",
          }}
        >
          Close App
        </button>
      </header>
    </div>
  );
}

export default App;
