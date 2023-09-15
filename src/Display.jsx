import React from "react"
import myLogo from "../src/Assets/Logo.svg"

const Display = () => {
    return(
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
            <div>
                <img src alt="display-picture" />
            </div>
        </div>
    )
}
export default Display