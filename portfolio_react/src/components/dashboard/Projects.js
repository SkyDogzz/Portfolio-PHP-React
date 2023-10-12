import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.post(process.env.REACT_APP_PHP_HOST + ':' + process.env.REACT_APP_PHP_PORT + '/project/')
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.projects);
                    setProjects(res.data.projects);
                }
                else {
                    alert(res.data.message);
                }
            })
    }, []);

    return (
        <div>
            <h2>Projects</h2>

            <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Categories</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => {
                        return (
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>{project.categories}</td>
                                <td>
                                    <button>Modifier</button>
                                    <button>Supprimer</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Link to="/dashboard/projects/add">Ajouter un projet</Link>

        </div>
    );
}