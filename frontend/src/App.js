import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Blog Application</h1>
      <Routes>
        <Route path="/signup" element={<h1>signup</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
