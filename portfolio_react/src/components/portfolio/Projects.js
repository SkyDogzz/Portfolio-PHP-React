import { Link } from "react-router-dom";

export default function Projects({ projects }) {
    console.log(projects);
    return (
        <div className="Projects">
            <h2>Projects</h2>
            {projects.length === 0 &&
                <h3>Rien à presenter pour le moment</h3>}
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <Link to={`/projects/${project.id}`}>{project.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}