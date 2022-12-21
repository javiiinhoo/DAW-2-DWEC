import React from "react";
import { Link } from "react-router-dom";
function NotFound(props) {
    return (<div data-cy='pageBody'>
        <h2 data-cy='pageHeader'>
            Si está, no lo veo
        </h2>
        <p data-cy='pageText'>
            Creo que te has equivocado. Esa página no existe

        </p>
        <Link to='/'>Inicio</Link>
    </div>
    )
}
export default NotFound;
