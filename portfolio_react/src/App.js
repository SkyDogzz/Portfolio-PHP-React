import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome!</h2>
      <Outlet />
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