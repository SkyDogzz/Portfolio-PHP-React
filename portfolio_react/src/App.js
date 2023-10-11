import { Routes, Route, Link } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Disconnect from "./components/Disconnect";
import "./styles/App.scss";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Portfolio />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="disconnect" element={<Disconnect />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}