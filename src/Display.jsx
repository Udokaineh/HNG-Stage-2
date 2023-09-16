import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import myLogo from "../src/Assets/Logo.svg"
import homeIcon from "../src/Assets/Home.svg"
import movieIcon from "../src/Assets/Movie.svg"
import tvIcon from "../src/Assets/TV.svg"
import calendarIcon from "../src/Assets/Calendar.svg"
import logoutIcon from "../src/Assets/Logout.svg"
import video from "../src/Assets/video.svg"
import button from "../src/Assets/extrabutton.svg"
import buttonn from "../src/Assets/extrabuttonn.svg"
import star from "../src/Assets/star.svg"
import extraa from "../src/Assets/extraa.svg"
import { FaHeart } from 'react-icons/fa'
import './App.css'


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
        <div className="display-container">
            <div className="side-bar">
                <div className="display-logo">
                    <img src={myLogo} alt="logo" />
                </div>
                <div className="icons-wrapper">
                    <div className="side-icon">
                        <img src={homeIcon} alt="home-icon" />
                        <p>Home</p>
                    </div>

                    <div className="side-icon movie">
                        <img src={movieIcon} alt="movie-icon" />
                        <p>Tv movies</p>
                    </div>

                    <div className="side-icon">
                        <img src={tvIcon} alt="Tv-icon" />
                        <p>Tv Series</p>
                    </div>

                    <div className="side-icon">
                        <FaHeart className="heart red-heart" />
                        <p>Favourite</p>
                    </div>

                    <div className="side-icon">
                        <img src={calendarIcon} alt="calender-icon" />
                        <p>Upcoming</p>
                    </div>
                </div>
                <div className="side-box">
                    <p className="side-box-p">Play movie quizes and earn free tickets</p>
                    <p className="side-boxp">50k people are playing now</p>
                    <button>Start playing</button>
                </div>

                <div className="side-icon">
                    <img src={logoutIcon} alt="logout-icon" />
                    <p>Log Out</p>
                </div>
            </div>


            <div className="display-div">
                <div className="video-div">
                    <img src={video} alt="video" />
                </div>
                <div className="title-star-div">
                    <h1 data-testid="movie-title">{movieDisplay.title}</h1>
                    <img src={star} alt="star-icon" />
                </div>
                <p data-testid="movie-release-date">{new Date(movieDisplay.release_date).toUTCString()}</p>
                <p data-testid="movie-runtime">{movieDisplay.runtime} minutes</p>
                <p className="overview" data-testid="movie-overview">{movieDisplay.overview}</p>
                <div className="extras">
                    <div className="extra-button">
                        <img src={button} alt="button" />
                        <img src={buttonn} alt="buttonn" />
                    </div>
                    <img src={extraa} alt="extraa" />
                </div>
            </div>

        </div>
    )
}
export default Display