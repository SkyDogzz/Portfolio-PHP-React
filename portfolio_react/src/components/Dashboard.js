import { useEffect } from "react";
import {Link} from "react-router-dom";

export default function Dashboard() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);

    return (
      <div>
        <p>
          <Link to="/disconnect">Disconnect</Link>
        </p>
        <h2>Dashboard</h2>
      </div>
    );
}