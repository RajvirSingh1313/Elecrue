import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [appName, setAppName] = useState("");

  useEffect(() => {
    fetch('http://localhost:5001/app-details')
      .then(response => response.text())
      .then(data => setAppName(data));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src</code> to work with react.
        </p>
        <p>
          Edit <code>public/electron</code> to work electron and express.
        </p>
        <p>
          Backend is up and running at http://localhost:5001
          and it shows <code>{appName}</code>
        </p>
        <a
          className="bg-blue-500 rounded p-2 m-1"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="bg-purple-500 rounded p-2 m-1"
          href="https://www.electronjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Electron
        </a>
        <a
          className="bg-pink-500 rounded p-2 m-1"
          href="https://tailwindcss.com/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Tailwindcss
        </a>
        <button onClick={() =>
          fetch("http://localhost:5001/close-app")
        }
          className="bg-gray-500 p-2 m-1 rounded">
          Close App
        </button>
      </header>
    </div>
  );
}

export default App;
