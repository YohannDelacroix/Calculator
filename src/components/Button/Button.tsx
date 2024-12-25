import React from 'react'
import "../../App.css"
import { TbMath } from "react-icons/tb"
import { TbMathPi } from "react-icons/tb"
import { BsDot } from "react-icons/bs"
import { CgMathDivide, CgMathMinus, CgMathPercent, CgMathPlus, CgMathEqual } from "react-icons/cg"
import { RxCross2 } from "react-icons/rx"
import { FiDelete } from "react-icons/fi"

interface ButtonProps {
    buttonValue: string
    onButtonClick: (value: string) => void
}

/* Composant Button
    Ce composant gère l'affichage des boutons avec leurs valeurs et icônes respectives.
*/
const Button = ({ buttonValue, onButtonClick }: ButtonProps) => {
    const disabledCommands = ["mod"];

    // Mappage des valeurs aux icônes
    const iconMap: { [key: string]: JSX.Element | string } = {
        "\u221a": <TbMath />,
        "\u03c0": <TbMathPi />,
        "<-": <FiDelete />,
        "/": <CgMathDivide />,
        "*": <RxCross2 />,
        "+": <CgMathPlus />,
        "-": <CgMathMinus />,
        "%": <CgMathPercent />,
        "=": <CgMathEqual />,
        ".": <BsDot />,
    };

    return (
        <button
            className={buttonValue === "=" ? "keyboard-button equal" : "keyboard-button"}
            onClick={() => onButtonClick(buttonValue)}
            disabled={disabledCommands.includes(buttonValue)}
            value={buttonValue}
        >
            {iconMap[buttonValue] || buttonValue}
        </button>
    );
}

export default Button;