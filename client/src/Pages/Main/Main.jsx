import React from "react"
import "./Main.css"
import {Link} from "react-router-dom"
import BgImage from "../../Assets/Bg-Main.png"

const Main = () => {
    return (
        <>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            
        </>
    )
}

export default Main