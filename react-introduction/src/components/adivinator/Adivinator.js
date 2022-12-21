import React, { useState } from "react";
import './Adivinator.css';
// generate random number
let rand = Math.ceil(Math.random() * 5);

const GuessTheNumber = () => {
    const [value, setValue] = useState("");
    const [results, setResults] = useState("");
    // 
    const onClick = () => {
        const intentoUsuario = parseInt(value, setValue); // convert string to integer

        setResults(<p className="ojo">Elige un número, no dejes vacío.</p>);

        if (intentoUsuario === rand)
            setResults(<p className="acierto">Has acertado, enhorabuena</p>);

        if (intentoUsuario > rand)
            setResults(<p className="advertma">El número es menor al insertado, sigue probando.</p>);

        if (intentoUsuario < rand)
            setResults(<p className="advertme">El número es mayor al insertado, sigue probando.</p>);
    };

    return (
        
        <div>
            <img src="https://www.lavozdegalicia.es/default/2022/09/12/00121662995043759755308/Foto/h12S0091.jpg" alt=""></img>
            <h2 className="titulo">Adivinator</h2>
            <p className="text">Lázaro te reta a adivinar el número entre 1 y 5.</p>
            <input className="insert"
                value={value}
                type="number" min="1" max="5" placeholder="Elige tu número. " list="defaultNumbers"
                onChange={e => setValue(e.target.value)}
            />
           {/* se me ocurrió esto para intentar controlar los valores de alguna manera, pero me sigue pareciendo 
           bastante libertad para el usuario. */}
            <datalist id="defaultNumbers">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
            </datalist>
            <button className="boton" type="submit" onClick={onClick}>
                Prueba
            </button>
            <br />
            {results}
        </div>
    );
};

export default GuessTheNumber;