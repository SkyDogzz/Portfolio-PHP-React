import { Routes, Route, Link } from "react-router-dom";
import Portfolio from "./components/Portfolio";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Portfolio />} />
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