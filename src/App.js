import React from "react"
import HomePage from "./HomePage";
import Footer from "./Footer"
import Display from "./Display"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" exact element={ <HomePage />} />
                    <Route path="/movie/:id" element={ <Display />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

// export default App;
// function App() {
//     return (
//         <div>
//             <HomePage />
//             <Display />
//             <Footer />
//         </div>
//     )
// }

export default App;