import {Token} from "./Token"
import React from 'react'
import Button from "./Button"

interface PropOperator{
  notation: string;
  execute: () => number
}

const Operator = ({notation, execute}: PropOperator) => {

  return (
    <Button value={notation} /> 
  )
}

export default Operator