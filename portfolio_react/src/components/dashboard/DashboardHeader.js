import { Link } from "react-router-dom";

export default function DashboardHeader() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/projects">Projects</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/disconnect">Logout</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}