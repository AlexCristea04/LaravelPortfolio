import { Link } from 'react-router-dom';
import LanguageToggle from "../Languages/LanguageToggle";
import '../Languages/i18n.js';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation('navbar');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
            <div className="container px-5">
                <Link className="navbar-brand fw-bolder text-primary" to="/">Alex Cristea</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">{t('Home')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/resume">{t('Resume')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/projects">{t('Projects')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">{t('Contact')}</Link>
                        </li>
                        <li className="nav-item">
                            <LanguageToggle/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
