const Footer = () => {
    return (
<footer>
    <img className="logo" src="images/logo_reservia.png" alt="Logo de Reservia" />
            <div className="containefooter">
                <h2>A propos</h2>
                <div>
                    <a href="#">
                        <p>Fonctionnement du site</p>
                    </a>
                </div>
                <div>
                    <a href="#">
                        <p>Condition générale de vente</p>
                    </a>
                </div>
                <div>
                    <a href="#">
                        <p>Données et confidentialité</p>
                    </a>
                </div>               
            </div>
            <div className="containefooter">
                <div>
                    <h2>Nos hebergements</h2>
                </div>
                <div>
                    <a href="#">
                        <p>Charte qualité</p>
                    </a>
                </div>
                <div>
                    <a href="#">
                        <p>Soumettre votre hôtel</p>
                    </a>
                </div>              
            </div>
            <div className="containefooter">
                <div>
                    <h2>Assistance</h2>
                </div>
                <div>
                    <a href="#">
                        <p>Centre d'aide</p>
                    </a>
                </div>
                <div>
                    <a href="#">               
                        <p>Nous contacter</p>
                    </a>
                </div>     
            </div>
        </footer>
    );
};

export default Footer;