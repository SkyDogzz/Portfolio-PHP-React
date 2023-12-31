import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProject() {
    let { id } = useParams();
    const [project, setProject] = useState({});
    const [categories, setCategories] = useState({ all: [], selected: [] });
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});

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
                    setCategories(res.data.categories);
                    setImages(res.data.images);
                }
                else {
                    alert(res.data.message);
                }
            })
    }, []);

    const moveImageUp = (index) => {
        if (index > 0) {
            const newImages = [...images];
            const temp = newImages[index - 1];
            newImages[index - 1] = newImages[index];
            newImages[index] = temp;
            setImages(newImages);
        }
    };

    const moveImageDown = (index) => {
        if (index < images.length - 1) {
            const newImages = [...images];
            const temp = newImages[index + 1];
            newImages[index + 1] = newImages[index];
            newImages[index] = temp;
            setImages(newImages);
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleImageUpload = (e) => {
        const newImages = [...e.target.files].map(file => ({
            id: Math.random(),
            name: file.name,
            file: file,
            isLocal: true
        }));

        setImages(prevState => ([...prevState, ...newImages]));

        e.target.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let validationErrors = {};

        if (!project.title) validationErrors.title = "Title is required";
        if (!project.description) validationErrors.description = "Description is required";

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            let formData = new FormData();
            formData.append('title', project.title);
            formData.append('description', project.description);
            formData.append('link', project.link);
            formData.append('github', project.github);
            formData.append('categories', categories.selected);
            if (images != null && images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    formData.append('images[]', images[i]);
                }
            }

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            axios.post(process.env.REACT_APP_PHP_HOST + ':' + process.env.REACT_APP_PHP_PORT + '/project/update/' + id, formData, config)
                .then((res) => {
                    if (res.data.success) {
                        console.log(res.data);
                    }
                    else {
                        console.log(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                });

        }
    }

    return (
        <div>
            <h2>EditProject </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={project.title ? project.title : ""} onChange={handleTitleChange} />
                    {errors.title && <span>{errors.title}</span>}
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={project.description ? project.description : ""} onChange={handleDescriptionChange} />
                    {errors.description && <span>{errors.description}</span>}
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
                        {categories.all ? categories.all.map(cat => (
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
                        {images ? images.map((img, index) => (
                            <li key={img.id}>
                                <img src={img.isLocal ? URL.createObjectURL(img.file) : `${process.env.REACT_APP_PHP_HOST}:${process.env.REACT_APP_PHP_PORT}/uploads/${img.name}`} alt={img.name} />
                                <button type="button" onClick={() => moveImageUp(index)}>Move Up</button>
                                <button type="button" onClick={() => moveImageDown(index)}>Move Down</button>
                                <button type="button" onClick={() => removeImage(index)}>Remove</button>
                            </li>
                        )) : ""}
                    </ul>
                    <label>Add Images:</label>
                    <input type="file" multiple onChange={handleImageUpload} />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}