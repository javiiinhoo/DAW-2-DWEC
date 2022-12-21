import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css'
function NotFound(props) {
    return (
    <div data-cy='pageBody'>
        <h1 data-cy='pageHeader' className="cabecera">
        Oh!
        </h1>
        <p data-cy='simpleMessage' className="parrafo">
        Parece que estás perdido
        </p>
        <Link data-cy='homeLink' to='/' className="enlace">Volver a casa</Link>
        <img src='/images/monkey-ninja.png'></img>
    </div>
    )
}
export default NotFound;
