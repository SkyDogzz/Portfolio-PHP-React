export default function PortfolioHeader() {
    return (
        <div className="PortfolioHeader">
            <div id="top"></div>
            <header className="PortfolioHeader">
                <nav className="PortfolioNav">
                    <ul>
                        <li>
                            <a href="#top">Introduction</a>
                        </li>
                        <li>
                            <a className="quaternary-color" href="#about">À propos</a>
                        </li>
                        <li>
                            <a href="#skills">Mes compétences</a>
                        </li>
                        <li>
                            <a href="#portfolio">Portfolio</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}