import "./App.css";
import Posts from "./components/Posts";

function App() {
  return (
    <div className="magic-container">
      <header className="magic-header">
        <h1>Harry Potter</h1>
        <p>The Registry of Magical Volumes</p>
      </header>
      <main>
        <Posts />
      </main>
    </div>
  );
}

export default App;
