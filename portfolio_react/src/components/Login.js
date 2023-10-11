import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        };

        axios.post(process.env.REACT_APP_PHP_HOST + ':' + process.env.REACT_APP_PHP_PORT + '/auth/login', formData, config)
            .then((res) => {
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    window.location.href = '/dashboard';
                }
                else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };



    return (
        <div className="Login">
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}