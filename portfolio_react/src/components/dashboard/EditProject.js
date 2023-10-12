import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProject() {
    let { id } = useParams();
    const [project, setProject] = useState({});
    const [categories, setCategories] = useState({ all: [], selected: [] });
    const [images, setImages] = useState([]);

    const handleTitleChange = (e) => {
        setProject(prevState => ({ ...prevState, title: e.target.value }));
    };

    const handleDescriptionChange = (e) => {
        setProject(prevState => ({ ...prevState, description: e.target.value }));
    }

    const handleLinkChange = (e) => {
        setProject(prevState => ({ ...prevState, link: e.target.value }));
    }

    const handleGithubChange = (e) => {
        setProject(prevState => ({ ...prevState, github: e.target.value }));
    }

    const handleCategoryChange = (e) => {
        const catId = Number(e.target.value);

        if (e.target.checked) {
            setCategories(prevState => ({ 
                ...prevState, 
                selected: [...(prevState.selected || []), { id: String(catId) }]
            }));
        } else {
            setCategories(prevState => ({
                ...prevState,
                selected: prevState.selected.filter(item => item.id !== String(catId))
            }));
        }
    }

    useEffect(() => {
        axios.post(process.env.REACT_APP_PHP_HOST + ':' + process.env.REACT_APP_PHP_PORT + '/project/show/' + id)
            .then((res) => {
                if (res.data.success) {
                    setProject(res.data.project);
                    console.log(res.data.categories);
                    setCategories(res.data.categories);
                    setImages(res.data.images);
                }
                else {
                    alert(res.data.message);
                }
            })
    }, []);

    //console.log(categories.selected.some(item => item.id === '1'));

    return (
        <div>
            <h2>EditProject </h2>
            <form>
                <div>
                    <label>Title:</label>
                    <input type="text" value={project.title ? project.title : ""} onChange={handleTitleChange} />
                </div>
                {/* desciption, link, github*/}
                <div>
                    <label>Description:</label>
                    <input type="text" value={project.description ? project.description : ""} onChange={handleDescriptionChange} />
                </div>
                <div>
                    <label>Link:</label>
                    <input type="text" value={project.link ? project.link : ""} onChange={handleLinkChange} />
                </div>
                <div>
                    <label>Github:</label>
                    <input type="text" value={project.github ? project.github : ""} onChange={handleGithubChange} />
                </div>


                <div>
                    <label>Categories:</label>
                    <ul>
                        { categories.all ? categories.all.map(cat => (
                            <li key={cat.id}>
                                <input type="checkbox" value={cat.id} checked={categories.selected ? categories.selected.some(item => item.id === cat.id) : ""} onChange={handleCategoryChange} />
                                <label>{cat.name}</label>
                            </li>
                        )) : ""}
                    </ul>
                </div>

                <div>
                    <label>Images:</label>
                    <ul>
                        {images.map(img => (
                            <li key={img.id}>
                                <img src={img.path} alt={img.name} />
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}