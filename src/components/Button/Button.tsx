import React, { useEffect } from 'react'
import "../../App.css"


const Button = ({value}: {value: string}) => {

    return (
        <>
            {
                value === "=" ? <div className="keyboard-button equal">
                    {value}
                </div> : <div className="keyboard-button">
                    {value}
                </div>
            }
        </>
    )
}

export default Button