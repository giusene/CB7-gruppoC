import styles from "./Dashboard.module.scss"
import Link from "next/link"
import { WiTime3 } from 'react-icons/wi';
import { AiOutlinePlus } from "react-icons/Ai";
import {FiStar} from "react-icons/Fi";
import { AiFillStar } from "react-icons/Ai";
import { BsBookmarkHeart } from "react-icons/Bs";
import { HiOutlineUserGroup } from "react-icons/Hi";
import { BiLogOut } from "react-icons/Bi";

import Cards from "@/components/Cards/Cards";
import { genres } from "@/utils/genres";


const Dashboard = ( {data} ) => {

    const minutesInHours = (data) => {
        const hours = Math.floor(data / 60);
        const minutes = data % 60;
    
        return `${hours}h ${minutes}m`;
      };
    

   const moc =  {
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
        "popularity": 78.857,
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
        "vote_count": 26824
    }

    return(
        <div className={styles.Dashboard}>
            <div className={styles.wrapper}>

            {/******************* SIDEBAR ********************/}

                <div className={styles.sidebar}>
                    <div className={styles.logo}>
                        <img
                            className={styles.logoFull}
                            src="https://img.logoipsum.com/297.svg" 
                        />
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.user}>
                            <img className={styles.userImage} src="https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg" alt="" />
                        </div>
                        <div className={styles.userName}>
                            <p>Name Cogname</p>
                        </div>

                    </div>
                    <div className={styles.sections}>
                        <ul className={styles.sectionList}>
                            <li className={styles.section}>
                                <Link href="/" className={styles.item}>
                                    <p > 
                                        <BsBookmarkHeart className={styles.icon}/>
                                    </p>
                                    <p>WATCHLIST</p>
                                </Link>
                            </li>
                            <li className={styles.section}>
                                <Link href="/" className={styles.item}>
                                    <p> 
                                        <WiTime3 className={styles.icon}/>
                                    </p>
                                    <p>UPCOMING</p>
                                </Link>
                            </li>
                            <li className={styles.section}>
                                <Link href="/" className={styles.item}>
                                    <p> 
                                        <HiOutlineUserGroup className={styles.icon}/>
                                    </p>
                                    <p>POPULAR</p>
                                </Link>
                            </li>
                            <li className={styles.section}>
                                <Link href="/" className={styles.item}>
                                    <p> 
                                        <FiStar className={styles.icon}/>
                                    </p>
                                
                                    <p>TOP RATED</p>
                                </Link>
                            </li>
                        </ul>

                        <div className={styles.logout}>
                                <Link href="/" className={`${styles.logoutLink}`}>
                                    <p> 
                                        <BiLogOut className={styles.icon}/>
                                    </p>
                                
                                    <p>LOGOUT</p>
                                </Link>
                        </div>
                    </div>
                </div>
            {/******************* END SIDEBAR ********************/}
                



            {/*******************  MAIN ********************/}

                <div className={styles.main}>
                    <div className={styles.mainHeader}>

                    </div>
                    <div className={styles.mainWrapper}>
                        <div className={styles.double}>
                            <div className={styles.hero}>

                                <div className={styles.heroCard}>
                                    <div className={styles.backgorund}>
                                        <img className={styles.image} src="https://image.tmdb.org/t/p/w780/hZkgoQYus5vegHoetLkCJzb17zJ.jpg" alt="" />
                                        <div className={styles.info}>

                                        <div className={styles.titleRating}>
                                            <h1>{moc.title}</h1>
                                            <p>
                                                 <AiFillStar className={styles.star}/>
                                                {Math.round(moc.vote_average * 10)/10}
                                            </p>
                                        </div>
                                        <div className={styles.generalInfo}>
                                            <p>{moc.release_date.slice(0, 4)}</p>
                                            <p>{minutesInHours(moc.runtime)}</p>
                                            <p>{moc.genres.map((el) => el.name )}</p>
                                        </div>
                                    </div>
                                    </div>
                                    
                                </div>

                            </div>
                            <div className={styles.scrolling}>

                                <div className={styles.scrollTitle}>
                                    <h1>Genres</h1>
                                </div>

                                <div className={styles.genreList}>
                                    {genres.map((genre) => 
                                            
                                              <Link href="/" className={styles.genreLink} key={genre.id}>
                                                 <div className={styles.genre}>
                                                {genre.name}
                                                </div>
                                              </Link> 
                                                )}
                                </div>

                            </div>
                        </div>
{/************************************************** BOTTOM */}
                        <div className={styles.bottom}>
                            <div className={styles.bottomTitle}>
                                <h1>Title</h1>
                            </div>
                            <Cards data={data}/>
                        </div>
                    
                    </div>
                </div>
            {/******************* END MAIN ********************/}





            </div>
        </div>
    )
}

export default Dashboard

