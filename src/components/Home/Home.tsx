import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import apiBaseURL from "../Api/ApiBaseURL";
interface Hotel {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  themes: THEME[]; 
  cityId: number | null;
}
interface Activity {
  id: number;
  name: string;
  image: string;
  cityId: number | null;
}
interface THEME {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

export default function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
 
  const [cityQuery, setCityQuery] = useState("");
  const [isCityListOpen, setIsCityListOpen] = useState(false);
  
  const [selectedThemeIds, setSelectedThemeIds] = useState<number[]>([]);
    // Calculer les thèmes uniques de manière automatique à partir des hôtels
  // On regroupe tous les thèmes de tous les hôtels, et on utilise un Map pour garder uniquement les IDs uniques
  const uniqueThemes = Array.from(
    new Map(
      hotels.flatMap((hotel) => hotel.themes || []).map((theme) => [theme.id, theme])
    ).values()
  );
  const filteredCities = selectedCity && cityQuery === selectedCity.name
    ? cities
    : cities.filter((city) =>
        city.name.toLocaleLowerCase("fr").includes(cityQuery.toLocaleLowerCase("fr"))
      );
      const filteredActivities = activities.filter(
        (activity) => !selectedCity || activity.cityId === selectedCity.id
      );
  const filteredHotels = hotels.filter((hotel) => {
    const matchesCity = !selectedCity || hotel.cityId === selectedCity.id;
    const matchesThemes = selectedThemeIds.length === 0 ||
      selectedThemeIds.every((selectedId) =>
        hotel.themes?.some((theme) => theme.id === selectedId)
      );
      
    return matchesCity && matchesThemes;
  });
  const columns: Activity[][] = [
  filteredActivities.slice(0, 1),
  filteredActivities.slice(1, 3),
  filteredActivities.slice(3, 4),
  filteredActivities.slice(4, 6),
];
  useEffect(() => {
    const loadHotels = async () => {
      try {
        const response = await fetch(`${apiBaseURL}/home`);
        const data = await response.json();

        
        console.log(data);
        setHotels(data.hotels); 

        setActivities(data.activities);
        setCities(Array.isArray(data.cities)
          ? data.cities.filter((city: City) => Number.isInteger(city.id) && typeof city.name === "string")
          : []);
      } catch (error) {
        console.log("Erreur dans la récupération des données des hôtels");
      }
    };
    loadHotels();
  }, []);

  return (
    <div className="main-container">

      <div className="main">
        <section id="search">
                <h1>Trouveza votre hébergement pour des vacances de rêve</h1>
                <p><span className="subtitle-search">En plein centre ville ou en pleine nature</span> </p>
                <div id="search-content">
                    <div className="maps">
                        <i className="fas fa-map-marker-alt"></i> 
                    </div> 
                    <div className="city-picker">
                      <input
                        type="search"
                        placeholder="Saisissez une ville"
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={isCityListOpen}
                        aria-controls="city-options"
                        value={cityQuery}
                        onFocus={() => setIsCityListOpen(true)}
                        onClick={() => setIsCityListOpen(true)}
                        onBlur={() => setIsCityListOpen(false)}
                        onChange={(event) => {
                          setCityQuery(event.target.value);
                          setSelectedCity(null);
                          setIsCityListOpen(true);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Escape") setIsCityListOpen(false);
                        }}
                      />
                      {isCityListOpen && (
                        <ul id="city-options" className="city-options" role="listbox">
                          {filteredCities.map((city) => (
                            <li key={city.id} role="presentation">
                              <button
                                type="button"
                                role="option"
                                aria-selected={city.id === selectedCity?.id}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => {
                                  setCityQuery(city.name);
                                  setSelectedCity(city);
                                  setIsCityListOpen(false);
                                }}
                              >
                                {city.name}
                              </button>
                            </li>
                          ))}
                          {filteredCities.length === 0 && (
                            <li className="city-options-empty">Aucune ville trouvée</li>
                          )}
                        </ul>
                      )}
                    </div>
                    <a href="#">
                        <div className="search-button">
                            <p>Rechercher</p>
                            <div>
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </a>
                </div>
                <div id="FILTERcontent">     
                    <div className="titlesfilter">
                        <h4>Filtres</h4>
                    </div>                    
                    <div className="underFILTERcontent">
                      {uniqueThemes.map((theme) => {
                        // On vérifie si ce filtre est actuellement sélectionné
                        const isSelected = selectedThemeIds.includes(theme.id);

                        return (
                          <button
                            type="button"
                            key={theme.id}
                            className={`underFILTER ${isSelected ? "active-filter" : ""}`}
                            aria-pressed={isSelected}
                            onClick={() => {
                              setSelectedThemeIds((currentIds) =>
                                isSelected
                                  ? currentIds.filter((id) => id !== theme.id)
                                  : [...currentIds, theme.id]
                              );
                            }}
                          >
                            <i className="fas fa-tag"></i>
                            <p>{theme.name}</p>
                          </button>
                        );
                      })}
                  </div>
                </div>
                <div className="info">
                    <div className="infoICON">
                        <i className="fas fa-info-circle"></i>
                    </div>
                    <div className="infotext">
                        <p>Plus de 500 logements sont disponibles dans cette ville </p>
                    </div>
                </div>
            </section>

        {/* SECTION HÉBERGEMENTS */}
        <div id="TOPbody"> 
          <section id="hebergement">
            <div className="HBtitle">
              <h2>Hébergements à {selectedCity?.name ?? "toutes les villes"}</h2>
            </div>
            
            <figure id="figure1">
              {filteredHotels.slice(0, 6).map((hotel) => (
                <div className="HBarticle" key={hotel.id}>
                  {/* Le reste de ta carte hôtel ne change pas */}
                  <NavLink to={`/hotel/${hotel.id}`}>
                    <img className="imgHB" src={`images/${hotel.image}`} alt={hotel.name} />
                    <div className="infoHB">
                      <h3>{hotel.name}</h3>
                      <div className="themesHB">
                        {hotel.themes && hotel.themes.map((theme) => (
                          <span key={theme.id} className="badge-theme">
                            {theme.name}
                          </span>
                        ))}
                      </div>
                      <div className="priceHB">
                        <p>Nuit à partir de {hotel.price}€</p>
                      </div>
                      <div className="starsHB">
                        <ul>
                          {/* On crée un tableau de 5 éléments (de 0 à 4) */}
                          {[0, 1, 2, 3, 4].map((index) => {
                            // Si l'index est inférieur à la note, l'étoile est pleine, sinon elle est vide
                            const isFilled = index < hotel.rating;

                            return (
                              <li key={index} className={isFilled ? "" : "starsempty"}>
                                <i className="fas fa-star"></i>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))}
            </figure>
            <div className="HBmore">
                        <a href="#">
                            <p>Afficher plus</p>
                        </a>
                    </div>
          </section>
        
        {/* SECTION ACTIVITY */}
        <aside>
                    <div id="titlepopular">
                        <h2>Les plus populaires</h2>
                        <i className="fas fa-chart-line"></i>
                    </div>
                        {filteredHotels
                          .slice() // On fait une copie pour ne pas modifier le tableau d'origine
                          .sort((a, b) => b.rating - a.rating) // Trie du plus grand au plus petit (5 étoiles d'abord)
                          .slice(0, 3) // On prend les 3 premiers du tableau trié
                          .map((hotel) => (
                            <NavLink className="contentpopularimg" to={`/hotel/${hotel.id}`}>
                              <img className="imgpopular" src={`images/${hotel.image}`} alt="Popular hotel" />
                              
                              <div className="infopopular">
                                <div className="txtpopular">
                                  <h3>{hotel.name}</h3>
                                  <div className="pricepopular">
                                    <p>Nuit à partir de {hotel.price}€</p>
                                  </div>
                                </div>
                                <div className="starscontent1">
                                  <ul>
                                    {[0, 1, 2, 3, 4].map((index) => {
                                      const isFilled = index < hotel.rating;

                                      return (
                                        <li key={index} className={isFilled ? "" : "starsempty"}>
                                          <i className="fas fa-star"></i>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </NavLink>
                          ))}  
                 
                        <div className="HBmore">
                        <a href="#">
                            <p>Afficher plus</p>
                        </a>
                    </div>  
                 

                </aside>
                </div>
                <section id="activity">
                <div className="titleactivity">
                    <h2> Activitées  {selectedCity?.name ?? " danstoutes les villes"}</h2>
                </div>
                <figure className="activityfigure">
                
                {columns.map((column, colIndex) => (
                  <div className="activity-column" key={colIndex}>
                    {column.map((activity) => (
                      activity && (
                        <NavLink to={`/activity/${activity.id}`}>
                          <article className="activity-card">
                            <img className="imgactivity" src={`images/${activity.image}`} alt={activity.name} />
                            <h3 className="titleCardActivity">{activity.name}</h3>
                          </article>
                        </NavLink>
                      )
                    ))}
                  </div>
                ))}
                </figure>
            </section>
      </div>

    </div>
  );
}

