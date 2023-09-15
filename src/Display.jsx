import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import myLogo from "../src/Assets/Logo.svg"


const Display = () => {
    const { id } = useParams()
    const [movieDisplay, setMovieDisplay] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const apiKey = "61463b958c4331101d43c1bba4ed0c37"

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                return response.json();
            })
            .then((data) => {
                setMovieDisplay(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch movie details:', error)
                setError('Failed to fetch movie details');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div>
            <div>
                <div>
                    <img src={myLogo} alt="logo" />
                    <h2>Movie Box</h2>
                </div>
                <div>
                    <p>Home</p>
                    <p>Tv movies</p>
                    <p>Upcoming</p>
                    <p>Favourite</p>
                </div>
                <div>
                    <p>Play movie quizes and earn free tickets</p>
                    <p>50k people are playing now</p>
                    <button>Start playing</button>
                </div>
                <p>Log Out</p>
            </div>
            <div>
                <div>
                    <h1 data-testid="movie-title">{movieDisplay.title}</h1>
                    <p data-testid="movie-release-date">{movieDisplay.release_date}</p>
                    <p data-testid="movie-runtime">{movieDisplay.runtime} minutes</p>
                    <p data-testid="movie-overview">{movieDisplay.overview}</p>
                </div>
            </div>
        </div>
    )
}
export default Display