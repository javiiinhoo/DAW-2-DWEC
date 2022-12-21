import React from "react";
import { Link } from "react-router-dom";
function About(props) {
    return (<div data-cy='issue3body'>
        <h2 data-cy='pageHeader'>
            Otra información
        </h2>
        <h4 data-cy='issue6link'>
            <Link to='/'>Volver a principal</Link>
        </h4>
        <p data-cy='paragraph418'>excepcional</p>
        
    </div>
    )
}

export default About;