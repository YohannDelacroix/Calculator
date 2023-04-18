import React from 'react'
import {Token} from "./Token"
import Button from "./Button"

interface PropOperand{
  value: string;
  execute: () => number
}

const Operand = ({value, execute}: PropOperand) => {
  return (
    <Button value={value} />
  )
}

export default Operand