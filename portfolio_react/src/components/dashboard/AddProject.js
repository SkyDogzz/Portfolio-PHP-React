import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddProject() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [github, setGithub] = useState('');
    const [images, setImages] = useState(null);
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post(process.env.REACT_APP_PHP_HOST + ':' + process.env.REACT_APP_PHP_PORT + '/category/', config)
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    setCategories(res.data.categories);
                }
                else {
                    alert(res.data.message);
                }
            }
            )
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        let validationErrors = {};

        if (!title) validationErrors.title = "Title is required";
        if (!description) validationErrors.description = "Description is required";


        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            let formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('link', link);
            formData.append('github', github);
            formData.append('categories', selectedCategories);
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

            axios.post(process.env.REACT_APP_PHP_HOST + ':' + process.env.REACT_APP_PHP_PORT + '/project/create', formData, config)
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
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const moveImage = (index, direction) => {
        if (direction === "up" && index > 0) {
            const newImages = [...images];
            const temp = newImages[index];
            newImages[index] = newImages[index - 1];
            newImages[index - 1] = temp;
            setImages(newImages);
        } else if (direction === "down" && index < images.length - 1) {
            const newImages = [...images];
            const temp = newImages[index];
            newImages[index] = newImages[index + 1];
            newImages[index + 1] = temp;
            setImages(newImages);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                {errors.title && <p>{errors.title}</p>}
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                {errors.description && <p>{errors.description}</p>}
            </div>
            <div>
                <label>Link:</label>
                <input type="url" value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
            <div>
                <label>Github:</label>
                <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>
            <div>
                <label>Categories:</label>
                {categories.map((category) => (
                    <div key={category.id}>
                        <input
                            type="checkbox"
                            id={`category-${category.id}`}
                            value={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedCategories(prev => [...prev, category.id]);
                                } else {
                                    setSelectedCategories(prev => prev.filter(id => id !== category.id));
                                }
                            }}
                        />
                        <label htmlFor={`category-${category.id}`}>{category.name}</label>
                    </div>
                ))}
            </div>
            <div>
                <label>Image:</label>
                <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
            </div>
            <div>
                {
                    images != null && images.length > 0 ? (
                        images.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Upload preview ${index}`}
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <button onClick={() => removeImage(index)}>Remove</button>
                                <button onClick={() => moveImage(index, "up")}>Move Up</button>
                                <button onClick={() => moveImage(index, "down")}>Move Down</button>
                            </div>
                        ))
                    ) : null
                }
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}