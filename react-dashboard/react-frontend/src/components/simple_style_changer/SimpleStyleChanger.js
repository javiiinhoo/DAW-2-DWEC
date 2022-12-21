import { useState } from "react";
import './SimpleStyleChanger.css';

const estilos = ["normal", "bold", "lighter"];
const SimpleStyleChanger = () => {
    const [estilo, setEstilo] = useState("");

    return (
        <div>
            <p data-cy='issue5text' className={estilo}>
                Los peces son parte del reino animal
            </p>
            <button data-cy='issue5button'
                onClick={() => {
                    setEstilo(estilos.pop());
                }}
            >
                Cambiar estilo
            </button>
        </div>
    )
}
export default SimpleStyleChanger;
/*
    const onClick1 = () => {
        let rand = Math.ceil(Math.random() * 3);

        const estilo = '';
        switch (rand) {
            case 1:
                setEstilo("normal");
                break;
            case 2:
                setEstilo("bold");
                break;
            case 3:
                setEstilo("bolder");
                break;
        }


        return estilo;
    }*/