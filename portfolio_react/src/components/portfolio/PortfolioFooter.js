import { useState, useEffect } from "react";
import axios from "axios";

export default function PortfolioFooter() {
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
                    setTelephone(res.data.data.telephone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1.$2.$3.$4.$5'));
                    setMessage(res.data.data.message);
                }
                else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    })

    return (
        <div className="portfolio-footer">
            <footer id="contact">
                <h2>Me contacter</h2>
                <div id="contact-container">
                    <div id="call">
                        <h3>Appelez-moi</h3>
                        { telephone ? <p>{telephone}</p> : <p>Non renseigné</p> }
                    </div>
                    <div id="email">
                        <h3>Envoyez-moi un email à</h3>
                        { email ? <p>{email}</p> : <p>Non renseigné</p> }
                    </div>
                </div>
            </footer>
        </div>
    );
}