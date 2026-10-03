import { useState, useEffect } from "react";
import apiBaseURL from "../Api/ApiBaseURL";
import { useParams } from "react-router-dom";
import "./Hotel.scss"


interface Hotel {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  cityId: number | null;
}
export default function Hotel() {

  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
        const loadHotel = async () => {
            try {
                const response = await fetch(`${apiBaseURL}/hotel/${id}`); 

                if (!response.ok) {
                    throw new Error('Échec de la récupération des données');
                }

                const data = await response.json();
                console.log(data);
                setHotel(data);
                console.log(hotel);
                

            } catch (error: any) {
                console.log('Erreur dans la récupération des données');

            }
        };

        loadHotel();
    }, [id]);
  return (
    <div className="main-container">
      <div className="main hotel-page">

        {/* FIL D'ARIANE */}
        <nav className="hp-breadcrumb" aria-label="Fil d'ariane">
          <a href="/">Accueil</a>
          <i className="fas fa-chevron-right"></i>

        </nav>

        {/* EN-TÊTE */}
        <section className="hp-header">
          <div className="hp-header-text">
            <h1>{hotel?.name}</h1>
            <div className="hp-meta">
              <div className="hp-stars">
                <ul>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li className="starsempty"><i className="fas fa-star"></i></li>
                </ul>
              </div>
              <span className="hp-location">
                <i className="fas fa-map-marker-alt"></i> {hotel?.city?.name ?? ""}, France
              </span>
            </div>
          </div>
          <div className="hp-header-actions">
            <button type="button" className="hp-btn-ghost">
              <i className="fas fa-share-alt"></i> Partager
            </button>
            <button type="button" className="hp-btn-ghost">
              <i className="fas fa-heart"></i> Enregistrer
            </button>
          </div>
        </section>

        {/* GALERIE */}
        <section className="hp-gallery">
          <img className="hp-gallery-main" src={`/images/${hotel?.image ?? ""}`} alt={hotel?.name ?? ""} />
          <img className="hp-gallery-sub" src={`/images/${hotel?.image ?? ""}`} alt="" />
          <img className="hp-gallery-sub" src={`/images/${hotel?.image ?? ""}`} alt="" />
          <img className="hp-gallery-sub" src={`/images/${hotel?.image ?? ""}`} alt="" />
          <img className="hp-gallery-sub" src={`/images/${hotel?.image ?? ""}`} alt="" />
        </section>

        <div className="hp-body">

          {/* COLONNE GAUCHE */}
          <div className="hp-content">

            <section className="hp-card">
              <h2>À propos de cet hébergement</h2>
              <p>{hotel?.description}</p>
              <div className="hp-themes">
                <span className="badge-theme">Romantique</span>
                <span className="badge-theme">Vue mer</span>
                <span className="badge-theme">Centre ville</span>
              </div>
            </section>

            <section className="hp-card">
              <h2>Équipements</h2>
              <ul className="hp-amenities">
                <li><i className="fas fa-wifi"></i> Wi-Fi gratuit</li>
                <li><i className="fas fa-swimming-pool"></i> Piscine</li>
                <li><i className="fas fa-parking"></i> Parking</li>
                <li><i className="fas fa-utensils"></i> Petit-déjeuner</li>
                <li><i className="fas fa-snowflake"></i> Climatisation</li>
                <li><i className="fas fa-concierge-bell"></i> Réception 24h/24</li>
              </ul>
            </section>

            <section className="hp-card">
              <h2>Avis des voyageurs</h2>
              <div className="hp-reviews">
                <article className="hp-review">
                  <div className="hp-review-head">
                    <div className="hp-avatar">M</div>
                    <div>
                      <h3>Marie</h3>
                      <small>Séjour en septembre</small>
                    </div>
                  </div>
                  <p>Un séjour parfait, personnel adorable et chambre impeccable.</p>
                </article>
                <article className="hp-review">
                  <div className="hp-review-head">
                    <div className="hp-avatar">T</div>
                    <div>
                      <h3>Thomas</h3>
                      <small>Séjour en août</small>
                    </div>
                  </div>
                  <p>Très bien situé, idéal pour découvrir la ville à pied.</p>
                </article>
              </div>
            </section>
          </div>

          {/* COLONNE DROITE : RÉSERVATION */}
          <aside className="hp-booking">
            <div className="hp-price">
              <span>À partir de</span>
              <strong>{hotel?.price ?? ""}</strong>
              <span>/ nuit</span>
            </div>

            <form className="hp-booking-form">
              <label>
                Arrivée
                <input type="date" />
              </label>
              <label>
                Départ
                <input type="date" />
              </label>
              <label>
                Voyageurs
                <input type="number" min="1" defaultValue={2} />
              </label>
              <button type="submit" className="hp-btn-primary">Réserver</button>
            </form>

            <p className="hp-booking-note">
              <i className="fas fa-info-circle"></i> Annulation gratuite jusqu'à 48h avant l'arrivée
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

