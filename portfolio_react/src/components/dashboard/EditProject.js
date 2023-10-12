import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProject() {
    let { id } = useParams();
    const [project, setProject] = useState({});

    useEffect(() => {
        axios.post(process.env.REACT_APP_PHP_HOST + ':' + process.env.REACT_APP_PHP_PORT + '/project/show/' + id)
            .then((res) => {
                if (res.data.success) {
                    setProject(res.data.project);
                }
                else {
                    alert(res.data.message);
                }
            })
    }, []);

    return (
        <div>
            <h2>EditProject </h2>
            
        </div>
    )
}