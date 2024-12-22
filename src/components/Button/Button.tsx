import React, { useEffect, useState } from 'react'
import "../../App.css"
import { TbMath } from "react-icons/tb"
import { TbMathPi } from "react-icons/tb"
import { BsDot } from "react-icons/bs"
import { CgMathDivide, CgMathMinus, CgMathPercent, CgMathPlus, CgMathEqual } from "react-icons/cg"
import { RxCross2 } from "react-icons/rx"
import { FiDelete } from "react-icons/fi"

interface ButtonProp{
    value: string
    onClick: (value: string) => void
}

/*Button component
    Assuring that the user see something easily understandable on the interface by converting str keys into icons
*/
const Button = ({value, onClick}: ButtonProp) => {
    const disabledCommands = ["mod"];

    return (
        <button className={value === "=" ? "keyboard-button equal" : "keyboard-button"} 
                onClick={() => onClick(value)} 
                disabled={disabledCommands.includes(value)}
                value={value}>
            {value === "\u221a" 
                ? <TbMath /> 
                : value === "\u03c0"
                ? <TbMathPi />
                : value === "<-"
                ? <FiDelete />
                : value === "/"
                ? <CgMathDivide />
                : value === "*"
                ? <RxCross2 />
                : value === "+"
                ? <CgMathPlus />
                : value === "-"
                ? <CgMathMinus />
                : value === "%"
                ? <CgMathPercent />
                : value === "="
                ? <CgMathEqual />
                : value === "."
                ? <BsDot />
                : value}
        </button>
    )
}

export default Button;