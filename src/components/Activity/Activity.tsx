import "./Activity.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiBaseURL from "../Api/ApiBaseURL";
interface Activity {
  id: number;
  name: string;
  description: string;
  image: string;
}

export default function Activity() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
        const loadActivity = async () => {
            try {
                const response = await fetch(`${apiBaseURL}/activity/${id}`);

                if (!response.ok) {
                    throw new Error('Échec de la récupération des données');
                }

                const data = await response.json();
                console.log(data);
                setActivity(data);
                console.log(activity);
                

            } catch (error: any) {
                console.log('Erreur dans la récupération des données');

            }
        };

        loadActivity();
    }, [id]);
  return (
    <div className="main-container">
      <div className="main activity-page">

        {/* FIL D'ARIANE */}
        <nav className="ap-breadcrumb" aria-label="Fil d'ariane">
          <a href="/">Accueil</a>
          <i className="fas fa-chevron-right"></i>
          <a href="/#activity">Activités</a>
          <i className="fas fa-chevron-right"></i>
          <span>{activity?.name ?? ""}</span>
        </nav>

        {/* EN-TÊTE */}
        <section className="ap-header">
          <div>
            <h1>{activity?.name ?? ""}</h1>
            <div className="ap-meta">
              <span className="badge-theme">Nature</span>
              <span><i className="fas fa-map-marker-alt"></i> Marseille, France</span>
              <span><i className="fas fa-clock"></i> 4h</span>
              <span className="ap-stars">
                <ul>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li className="starsempty"><i className="fas fa-star"></i></li>
                </ul>
              </span>
            </div>
          </div>
          <div className="ap-actions">
            <button type="button" className="ap-btn-ghost">
              <i className="fas fa-share-alt"></i> Partager
            </button>
            <button type="button" className="ap-btn-ghost">
              <i className="fas fa-heart"></i> Enregistrer
            </button>
          </div>
        </section>

        {/* IMAGE */}
        <figure className="ap-cover">
          <img src={`/images/${activity?.image ?? ""}`} alt={activity?.name ?? ""} />
        </figure>

        <div className="ap-body">

          {/* COLONNE GAUCHE */}
          <div className="ap-content">

            <section className="ap-card">
              <h2>À propos de cette activité</h2>
              <p>{activity?.description ?? ""}</p>
            </section>

            <section className="ap-card">
              <h2>Informations pratiques</h2>
              <ul className="ap-infos">
                <li><i className="fas fa-clock"></i> Durée : 4h</li>
                <li><i className="fas fa-users"></i> Groupe de 12 personnes max</li>
                <li><i className="fas fa-language"></i> Français, anglais</li>
                <li><i className="fas fa-map-marker-alt"></i> Départ : Vieux-Port</li>
                <li><i className="fas fa-check"></i> Matériel fourni</li>
                <li><i className="fas fa-ban"></i> Annulation gratuite 24h avant</li>
              </ul>
            </section>

            <section className="ap-card">
              <h2>Avis des participants</h2>
              <div className="ap-reviews">
                <article className="ap-review">
                  <div className="ap-review-head">
                    <div className="ap-avatar">M</div>
                    <div>
                      <h3>Marie</h3>
                      <small>Activité réalisée en septembre</small>
                    </div>
                  </div>
                  <p>Une expérience incroyable, le guide était passionnant.</p>
                </article>
                <article className="ap-review">
                  <div className="ap-review-head">
                    <div className="ap-avatar">T</div>
                    <div>
                      <h3>Thomas</h3>
                      <small>Activité réalisée en août</small>
                    </div>
                  </div>
                  <p>Très bien organisé, je recommande à toute la famille.</p>
                </article>
              </div>
            </section>
          </div>

          {/* COLONNE DROITE : RÉSERVATION */}
          <aside className="ap-booking">
            <div className="ap-price">
              <span>À partir de</span>
              <strong>35€</strong>
              <span>/ personne</span>
            </div>

            <form className="ap-booking-form">
              <label>
                Date
                <input type="date" />
              </label>
              <label>
                Participants
                <input type="number" min="1" defaultValue={2} />
              </label>
              <button type="submit" className="ap-btn-primary">Réserver</button>
            </form>

            <p className="ap-booking-note">
              <i className="fas fa-info-circle"></i> Annulation gratuite jusqu'à 24h avant l'activité
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
