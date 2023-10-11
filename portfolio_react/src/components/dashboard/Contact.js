import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Contact() {
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };

        axios.post(process.env.REACT_APP_PHP_HOST + ':' + process.env.REACT_APP_PHP_PORT + '/contact', config)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    setEmail(res.data.data.email);
                    setTelephone(res.data.data.telephone);
                    setMessage(res.data.data.message);
                }
                else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('telephone', telephone);
        formData.append('message', message);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        };

        axios.post(process.env.REACT_APP_PHP_HOST + ':' + process.env.REACT_APP_PHP_PORT + '/contact/update', formData, config)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    alert(res.data.message);
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
        <div>
            <h2>Contact</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Téléphone:</label>
                    <input
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}