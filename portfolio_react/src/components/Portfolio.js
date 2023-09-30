import PortfolioHeader from './portfolio/PortfolioHeader';
import PortfolioMain from './portfolio/PortfolioMain';
import PortfolioFooter from './portfolio/PortfolioFooter';
import '../styles/Portfolio.scss';

export default function Portfolio() {
    return (
        <div className="Portfolio">
            <PortfolioHeader />
            <PortfolioMain />
            <PortfolioFooter />
        </div>
    );
}