import React, { useEffect, useState } from 'react'
import "../../App.css"
import { TbMath } from "react-icons/tb"
import { TbMathPi } from "react-icons/tb"
import { FiDelete } from "react-icons/fi"


interface ButtonProp{
    value: string
    onClick: (value: string) => void
}


const Button = ({value, onClick}: ButtonProp) => {

    const disabledCommands = ["sq", "^", "mod", "%"]

    return (

        <button className={value === "=" ? "keyboard-button equal" : "keyboard-button"} onClick={() => onClick(value)} disabled={disabledCommands.includes(value)}>
        
        {value === "sq" 
            ? <TbMath /> 
            : value === "pi"
            ? <TbMathPi />
            : value === "<-"
            ? <FiDelete />
            : value}
        
        </button>
    )
}

export default Button