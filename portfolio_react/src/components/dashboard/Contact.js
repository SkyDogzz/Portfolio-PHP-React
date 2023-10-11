import { useState } from 'react';

export default function Contact() {
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            email,
            telephone,
            message
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