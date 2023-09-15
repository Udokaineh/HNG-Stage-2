
import React, { useState, useEffect } from "react"
import myLogo from "../src/Assets/Logo.svg"
import searchIcon from "../src/Assets/Search.svg"
import myMenu from "../src/Assets/Menu.svg"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import './App.css'


const HomePage = () => {
    const [topMovies, setTopMovies] = useState([])
    const [movieGenres, setMovieGenres] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchState, setSearchState] = useState("")


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

    const CircularProgressBar = ({percentage}) => {
        return (
            <div style={{width: "100px"}}>
                <CircularProgressbar 
                    value={percentage}
                    text={`${percentage}%`}
                    style={buildStyles({
                            textColor: 'black',
                            pathColor: 'green',
                            trailColor: 'lightgray'
                    })}
                />
            </div>
        )
    }

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
        <div>
            <div>
                <img src={myLogo} alt="logo" />
                <h2>Movie Box</h2>
            </div>
            <div>
                <input onChange={handleSearch}
                    type="text"
                    placeholder="what do you want to watch?"
                    value={searchState}
                />
                <img src={searchIcon} alt="search-icon" />
            </div>
            <div>
                <img src={myMenu} alt="menu-Icon" />
                <p>Sign in</p>
            </div>
            <div>
                <h2>John Wick 3 : Parabellum</h2>
                <p>John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>
                <div>
                    <button>WATCH TRAILER</button>
                </div>
                {/* <img src={"https://image.tmdb.org/t/p/w185/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"} alt="landing-poster" /> */}
            </div>
        </div>

        <h1>Featured Movie </h1>
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <div className="home-container">
                {filteredSearch.map((movie) => {
                    const getGenre = getGenreName(movie.genre_ids)
                    return (
                        <div key={movie.id} className="movie-card" data-testid="movie-card">
                            <a href={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} ><img
                                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                                alt={movie.title}
                                data-testid="movie-poster"
                            /></a>
                            <p data-testid="movie-release-date">{movie.release_date}</p>
                            <h2 data-testid="movie-title">{movie.title}</h2>
                            <p>TMDb {movie.vote_average * 10}.0 / 100</p>
                            <p>{movie.vote_average * 10}%</p>
                            <CircularProgressBar percentage={movie.vote_average * 10} />
                            <p>{getGenre}</p>
                        </div>
                        // console.log(movie.poster_path)
                    )
                })}
            </div>
        )}
    </div>
)
}


export default HomePage;
