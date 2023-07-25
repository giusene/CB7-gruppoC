import styles from "./Card.module.scss"
 import { AiFillHeart } from 'react-icons/Ai'
 import { useState } from "react";

const Card = () => {

    const minutesInHours = (data) => {
        const hours = Math.floor(data / 60);
        const minutes = data % 60;
      
        return `${hours}h ${minutes}m`;
      };

    const mock = {
        "adult": false,
        "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
        "belongs_to_collection": null,
        "budget": 63000000,
        "genres": [
            {
                "id": 18,
                "name": "Drama"
            }
        ],
        "homepage": "http://www.foxmovies.com/movies/fight-club",
        "id": 550,
        "imdb_id": "tt0137523",
        "original_language": "en",
        "original_title": "Fight Club",
        "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
        "popularity": 81.744,
        "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        "production_companies": [
            {
                "id": 508,
                "logo_path": "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
                "name": "Regency Enterprises",
                "origin_country": "US"
            },
            {
                "id": 711,
                "logo_path": "/tEiIH5QesdheJmDAqQwvtN60727.png",
                "name": "Fox 2000 Pictures",
                "origin_country": "US"
            },
            {
                "id": 20555,
                "logo_path": "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
                "name": "Taurus Film",
                "origin_country": "DE"
            },
            {
                "id": 54051,
                "logo_path": null,
                "name": "Atman Entertainment",
                "origin_country": ""
            },
            {
                "id": 54052,
                "logo_path": null,
                "name": "Knickerbocker Films",
                "origin_country": "US"
            },
            {
                "id": 4700,
                "logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
                "name": "The Linson Company",
                "origin_country": "US"
            },
            {
                "id": 25,
                "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
                "name": "20th Century Fox",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "1999-10-15",
        "revenue": 100853753,
        "runtime": 139,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            }
        ],
        "status": "Released",
        "tagline": "Mischief. Mayhem. Soap.",
        "title": "Fight Club",
        "video": false,
        "vote_average": 8.436,
        "vote_count": 26793
    }

    // https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg
    // back drop /hZkgoQYus5vegHoetLkCJzb17zJ.jpg


    return(
        <>
        
                <div className={styles.Card}>
                    <div className={styles.bgCard}>
                        <img className={styles.bgImage} src="https://image.tmdb.org/t/p/w300/hZkgoQYus5vegHoetLkCJzb17zJ.jpg" alt="" />
                        <div className={styles.black}>
                            <p className={styles.black_parag}>{mock.original_title}</p>
                        </div>
                        </div>
                    <div className={styles.text}>
                        <div className={styles.card_title}>
                                <h3 className={styles.text_title}>{mock.original_title}</h3>
                                <p className={styles.heart}><AiFillHeart /></p>
                        </div>
                        <div className={styles.info}>
                            <div className="year">
                                <p>{mock.status === "Released" ? mock.release_date.slice(0, 4) : "Unrealeased"}</p>
                            </div>
                            <div className="duration">
                                {minutesInHours(mock.runtime)}
                            </div>

                        </div>
                        <div className="card_title">
                                <h3>{mock.overview.slice(0,100) + "..."}</h3>
                        </div>
                    </div>
                </div>

                

        </>
    )
    
}

export default Card