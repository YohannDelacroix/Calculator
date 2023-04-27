
import React from 'react'
import Button from "./Button"
import { useStackContext } from '../../StackContext'
import { push, getLastIn, pop } from '../Stack/StackMethods'

interface PropOperator{
  notation: string;
  execute: () => number
}

const Operator = ({notation, execute}: PropOperator) => {
  const {operatorStack, setOperatorStack, operandStack, setOperandStack} = useStackContext();

  const clickOperator = () => {
    push(operatorStack, setOperatorStack, [notation])
  }

  return (
    <Button value={notation} onClick={clickOperator}/> 
  )
}

export default Operator