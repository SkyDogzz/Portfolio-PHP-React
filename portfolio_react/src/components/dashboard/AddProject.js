import { useState } from 'react';

export default function AddProject() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [github, setGithub] = useState('');
    const [images, setImages] = useState(null);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        let validationErrors = {};

        if (!title) validationErrors.title = "Title is required";
        if (!description) validationErrors.description = "Description is required";


        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

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
                <label>Image:</label>
                <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}