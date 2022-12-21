import { useState } from "react";
import './SimpleColorPicker.css';
const SimpleColorPicker = () => {
    const [cls, setCls] = useState("");

    const onClick1 = () => {
        setCls("red");
    };
    const onClick2 = () => {
        setCls("green");
    };
    const onClick3 = () => {
        setCls("blue");
    };
    return <div data-cy='issue4color'
        className={cls} id="picker">
        <button data-cy='firstButton' onClick={onClick1}>Primer color</button>
        <button data-cy='secondButton' onClick={onClick2}>Segundo color</button>
        <button data-cy='thirdButton' onClick={onClick3}>Tercer color</button>
    </div>
}
export default SimpleColorPicker;
