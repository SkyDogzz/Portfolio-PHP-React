import { useEffect, useState } from "react"
import Projects from "./Projects"
import axios from "axios";

export default function Portfolio() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:' + process.env.REACT_APP_PHP_PORT + '/project/')
            .then((res) => {
                if (res.data.success) {
                    setProjects(res.data.projects);
                }
                else {
                    alert(res.data.message);
                }
            })
    }, []);

    useEffect(() => {
        const h1Shadow = document.querySelector(".h1-shadow");
        const h1 = document.querySelector('h1');

        let mouseX = 0;
        let mouseY = 0;
        let toMovX = 0;
        let toMovY = 0;

        const lerp = (a, b, t) => a * (1 - t) + b * t;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const updatePosition = () => {
            // Utilisation de la fonction lerp pour lisser le mouvement
            toMovX = lerp(toMovX, (mouseX - window.innerWidth / 2) / window.innerWidth * 100, 0.1);
            toMovY = lerp(toMovY, (mouseY - window.innerHeight / 2) / window.innerHeight * 100, 0.1);

            h1Shadow.style.transform = `translate(calc(-50% + ${toMovX}px), calc(-50% + ${toMovY}px)) rotate(-20deg)`;
            h1.style.transform = `translate(calc(-50% + ${-toMovX}px), calc(-50% + ${-toMovY}px))`;

            // Continuer à mettre à jour la position jusqu'à ce qu'elle atteigne la position finale
            if (Math.abs(mouseX - toMovX) > 0.1 || Math.abs(mouseY - toMovY) > 0.1) {
                requestAnimationFrame(updatePosition);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        updatePosition();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const progressBars = document.getElementsByClassName('progress-bar');
        const smoothScrollContainer = document.querySelector('.Portfolio');

        smoothScrollContainer.addEventListener('scroll', function () {
            const scrollTop = smoothScrollContainer.scrollTop;
            const clientHeight = smoothScrollContainer.clientHeight;

            let topElementToTopViewPortProgressBars = []
            for (let i = 0; i < progressBars.length; i++) {
                topElementToTopViewPortProgressBars.push(progressBars[i].getBoundingClientRect().top)
            }
            for (let i = 0; i < progressBars.length; i++) {
                if (scrollTop > (scrollTop + topElementToTopViewPortProgressBars[i] - clientHeight) && scrollTop < (scrollTop + topElementToTopViewPortProgressBars[i])) {
                    setTimeout(function () {
                        progressBars[i].children[0].style.width = progressBars[i].children[0].getAttribute('data-percentage') + '%';
                        console.log(progressBars[i].children[0].style.width = progressBars[i].children[0].getAttribute('data-percentage') + '%')
                    }, 50 * i)
                }
                else {
                    progressBars[i].children[0].style.width = '0%';
                }
            }
        })

    }, []);


    return (
        <main className="PortfolioMain">
            <section className="PortfolioSection PortfolioIntroduction">
                <h1>
                    <span className="quinary-color">Je suis</span>
                    <br />développeur<br />full stack
                    <span className="quaternary-color">.</span>
                </h1>
                <div className="h1-shadow">
                    <p>Full stack</p>
                </div>

            </section>
            <section id="about">
                <h2>À propos</h2>
                <div id="about-container">
                    <div id="about-content">
                        <h3 className="about-base about-base-top">Mon nom est <span className="quaternary-color">Thomas
                            Stephan</span>
                        </h3>
                        <p className="about-base about-base-right">
                            Je suis un développeur Web full stack passionné par le dévoloppement front et back.
                            Je suis actuellement en 3éme année de master en Ingéniérie du Web à l'ESGI de Paris.
                            J'ai acquis des compétences et des connaissances en Javascript, PHP, SQL, HTML,
                            CSS necessaires à la création d'un site web et la réussite de vos projets. J'aime chaque
                            parti de la création d'un site web et je suis à l'écoute de vos besoins.
                        </p>
                        <div className="about-base about-base-right" id="information">
                            <div>
                                <p className="quaternary-color">Nom</p>
                                <p>Thomas Stephan</p>
                            </div>
                            <div>
                                <p className="quaternary-color">Téléphone</p>
                                <p>07.84.03.17.82</p>
                            </div>
                            <div>
                                <p className="quaternary-color">Pays</p>
                                <p>France</p>
                            </div>
                            <div>
                                <p className="quaternary-color">Email</p>
                                <p>thomas.stephan@live.fr</p>
                            </div>
                        </div>
                        <div className="about-base about-base-bottom" id="school">
                            <h3 className="quaternary-color">École</h3>
                            <a href="https://www.esgi.fr/">
                                <p>Master en Ingéniérie du Web</p>
                                <p>ESGI, École Supérieure de Génie Informatique</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="skills">
                <h2>Mes compétences</h2>
                <div id="skills-container">
                    <div id="progress-bars">
                        <div>
                            <p>Anglais</p>
                            <div className="progress-bar">
                                <div data-percentage="80"></div>
                            </div>
                        </div>
                        <div>
                            <p>HTML5</p>
                            <div className="progress-bar">
                                <div data-percentage="90"></div>
                            </div>
                        </div>
                        <div>
                            <p>CSS3</p>
                            <div className="progress-bar">
                                <div data-percentage="80"></div>
                            </div>
                        </div>
                        <div>
                            <p>Javascript</p>
                            <div className="progress-bar">
                                <div data-percentage="90"></div>
                            </div>
                        </div>
                        <div>
                            <p>PHP</p>
                            <div className="progress-bar">
                                <div data-percentage="70"></div>
                            </div>
                        </div>
                        <div>
                            <p>SQL</p>
                            <div className="progress-bar">
                                <div data-percentage="60"></div>
                            </div>
                        </div>
                        <div>
                            <p>Github</p>
                            <div className="progress-bar">
                                <div data-percentage="70"></div>
                            </div>
                        </div>
                        <div>
                            <p>ReactJS</p>
                            <div className="progress-bar">
                                <div data-percentage="50"></div>
                            </div>
                        </div>
                        <div>
                            <p>Laravel</p>
                            <div className="progress-bar">
                                <div data-percentage="80"></div>
                            </div>
                        </div>
                        <div>
                            <p>Symfony</p>
                            <div className="progress-bar">
                                <div data-percentage="50"></div>
                            </div>
                        </div>
                        <div>
                            <p>Tailwind</p>
                            <div className="progress-bar">
                                <div data-percentage="50"></div>
                            </div>
                        </div>
                        <div>
                            <p>Git</p>
                            <div className="progress-bar">
                                <div data-percentage="50"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="cv-container">
                    <a href="/Thomas STEPHAN Resume.pdf">
                        <button>Voir mon CV</button>
                    </a>
                </div>
                <h3>Je suis disponible en tant que freelance</h3>
            </section>
            <section id="portfolio">
                <h2>Portfolio</h2>
                <Projects projects={projects} />
            </section>
        </main>
    )
}