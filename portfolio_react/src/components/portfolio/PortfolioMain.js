export default function Portfolio() {
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
                    <div className="profil-pic">
                        <img className="about-base about-base-left" src="img/ThomasStephan.png" alt="Thomas Stephan" />
                    </div>
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
                            <p>NuxtJS</p>
                            <div className="progress-bar">
                                <div data-percentage="50"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Je suis disponible en tant que freelance</h3>
            </section>
            <section id="portfolio">
                <h2>Portfolio</h2>
                <h3>Rien à presenter pour le moment</h3>
            </section>
        </main>
    )
}