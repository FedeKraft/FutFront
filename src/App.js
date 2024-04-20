import './App.css';
import Register from './register';
import Login from './login';


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Register /> {/* Renderiza el componente de Register */}
          <Login /> {/* Renderiza el componente de Register */}


      </header>
    </div>
  );
}

export default App;
