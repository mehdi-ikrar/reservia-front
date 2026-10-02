import "./Header.scss";

const Header = () => {
    return (
        <header className="site-header">
            <div className="sh-inner">
                <a className="sh-brand" href="/">
                    <img className="sh-logo" src="/images/logo_reservia.png" alt="Logo de Reservia" />
                </a>

                <nav className="sh-nav" aria-label="Navigation principale">
                    <ul className="sh-links">
                        <li>
                            <a className="sh-link sh-link-active" href="/#hebergement">
                                <i className="fas fa-bed"></i>
                                <span>Hébergements</span>
                            </a>
                        </li>
                        <li>
                            <a className="sh-link" href="/#activity">
                                <i className="fas fa-hiking"></i>
                                <span>Activités</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="sh-actions">
                    <a className="sh-btn-ghost" href="#">
                        <i className="fas fa-user"></i>
                        <span>Se connecter</span>
                    </a>
                    <a className="sh-btn-primary" href="#">
                        <span>S'inscrire</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;