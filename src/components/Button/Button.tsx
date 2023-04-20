import React, { useEffect } from 'react'
import "../../App.css"

interface ButtonProp{
    value: string
    onClick: () => void
}


const Button = ({value, onClick}: ButtonProp) => {

    return (
        <>
            {
                value === "=" ? <div className="keyboard-button equal" onClick={onClick}>
                    {value}
                </div> : <div className="keyboard-button" onClick={onClick}>
                    {value}
                </div>
            }
        </>
    )
}

export default Button