import React, { useState, useEffect } from 'react';
import SimpleCounter from "../../components/simple_counter/SimpleCounter";
import SimpleColorPicker from "../../components/simple_color_picker/SimpleColorPicker";
import SimpleStyleChanger from "../../components/simple_style_changer/SimpleStyleChanger";
import TimestampChecker from '../../components/timestamp_checker/TimestampChecker';
import './Examples.css';
import { Link } from "react-router-dom";
function Examples(props) {
    const axios = require("axios");
    const [number, setNumber] = useState(0);
    const [color, setColor] = useState(0);
    const onClickCounter = () => {
        setNumber(number + 1)
    }

    useEffect(() => {
        console.log('El hook useEffect se ha ejecutado. Número del contador: ' + number);

    })

    const [headerColor, setHeaderColor] = useState("negro");
    const onClickColor = () => {
        setColor(color + 1)
        setHeaderColor(color % 2 === 1 ? "negro" : "rojo");
    }
    useEffect(() => {
        document.title = 'Has clicado ' + number + ' veces';

    });


    const [dashboards, setDashboards] = useState([]);
    useEffect(() => {
        axios.get('http://raspi:8000/api/v1/dashboards').then(response => {
            setDashboards(response.data);
        })
    }, []);
    return <div>
        <h2 data-cy='pageHeader' className={headerColor}>Otros</h2>

        <button data-cy='issue12button' onClick={onClickColor}>Cambiar color</button>

        <div data-cy='issue3div'>
            <h1>Ejercicio 3</h1>
            <SimpleCounter onClickCounter={onClickCounter} number={number} />
        </div>
        <div data-cy='issue4div'>
            <h1>Ejercicio 4</h1>
            <SimpleColorPicker />
        </div>
        <div data-cy='issue5div'>
            <h1>Ejercicio 5</h1>
            <SimpleStyleChanger />
        </div>
        <h4 data-cy='issue6link'>
            <Link to='/'>Volver a principal</Link>
        </h4>
        <div data-cy='issue13div'>
            <h1>Ejercicio 13</h1>
            <TimestampChecker />
        </div>
        <div data-cy='issue14div'>
            <h1>Ejercicio 14</h1>
            <TimestampChecker formatDate={true} />
        </div>
        <div data-cy='issue15div'>
            <h1>Ejercicio 15</h1>
            <p>Se han obtenido {dashboards.length} dashboards</p>
        </div>





    </div>
}
export default Examples;
