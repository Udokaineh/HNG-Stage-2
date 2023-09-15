
import React, { useState, useEffect } from "react"
import myLogo from "../src/Assets/Logo.svg"
import searchIcon from "../src/Assets/Search.svg"
import myMenu from "../src/Assets/Menu.svg"
import cherry from "../src/Assets/cherry.svg"
import play from "../src/Assets/Play.svg"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Link } from 'react-router-dom'
import './App.css'


const HomePage = () => {
    const [topMovies, setTopMovies] = useState([])
    const [movieGenres, setMovieGenres] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchState, setSearchState] = useState("")
    const [percentage] = useState(0)


    const handleSearch = (e) => {
        setSearchState(e.target.value)
    }

    const filteredSearch = topMovies.filter(item =>
        item.title.toLowerCase().includes(searchState.toLowerCase()
        ))

    // function to get the genre name instead of id number
    const getGenreName = (genreIds) => {
        return genreIds
            .map((genreId) => {
                const foundGenre = movieGenres.find((genre) => genre.id === genreId)
                return foundGenre ? foundGenre.name : ""
            })
            .join(", ")
    }

    <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
            textColor: "black",
            pathColor: "green",
            trailColor: "#ccc"
        })}
    />

    useEffect(() => {
        const apiKey = "61463b958c4331101d43c1bba4ed0c37"

        // using .then()
        const fetchMovieGenre = () => {
            fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    setMovieGenres(data.genres)
                })
        }
        // I fetched the movies using the async/await you can use .then(), its optional, I am just trying to get farmiliar with using the two
        const fetchTenMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error("Please reload the page!")
                }
                const data = await response.json()
                setTopMovies(data.results)
                console.log(data)
                setLoading(false)
            } catch (error) {
                setError("Please reload the page!")
                setLoading(false)
            }
        }

        fetchTenMovies()
        fetchMovieGenre()
    }, [])

    return (
        <div>
            <div className="hero-section">
                <span>
                    <div className="header-section">
                        <div className="logo-name-div">
                            <img className="logo" src={myLogo} alt="logo" />
                        </div>
                        <div className="input-div">
                            <input onChange={handleSearch}
                                type="text"
                                placeholder="what do you want to watch?"
                                value={searchState}
                            />
                            <img src={searchIcon} alt="search-icon" />
                        </div>
                        <div className="menu-div">
                            <p>Sign in</p>
                            <img src={myMenu} alt="menu-Icon" />
                        </div>
                    </div>
                    <div className="hero-text-div">
                        <h2>John Wick 3 : Parabellum</h2>
                        <div className="percent">
                            <p className="highlight" >TMDb 86.0 / 100 </p>
                            <div className="cherry-div">
                                <img src={cherry} alt="cherry-icon" />
                                <p>87%</p>
                            </div>
                        </div>

                        <p className="hero-p">John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>

                        <button className="button">
                            <img src={play} alt="play-icon" />
                            WATCH TRAILER
                        </button>
                    </div>
                </span>
            </div>

            <div className="wrapper">
                <h1>Featured Movie </h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="movie-container">
                        {filteredSearch.map((movie) => {
                            const getGenre = getGenreName(movie.genre_ids)
                            const moviePercentage = movie.vote_average * 10

                            return (
                                <div key={movie.id} className="movie-card" data-testid="movie-card">
                                    <div>
                                        <Link to={`/movie/${movie.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                                                alt={movie.title}
                                                data-testid="movie-poster"
                                            />
                                        </Link>
                                        <p className="date" data-testid="movie-release-date">{new Date(movie.release_date).toUTCString()}</p>
                                        <h2 data-testid="movie-title">{movie.title}</h2>
                                        <p className="highlight">TMDb {movie.vote_average * 10}.0 / 100</p>
                                        <p>{movie.vote_average * 10}%</p>
                                        <div style={{ width: '40px' }}>
                                            <CircularProgressbar value={moviePercentage} text={`${moviePercentage}%`} />
                                        </div>
                                        <p>{getGenre}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}


export default HomePage;
