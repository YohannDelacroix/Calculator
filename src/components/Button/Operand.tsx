import React from 'react'
import {Token} from "./Token"
import Button from "./Button"
import { useStackContext } from '../../StackContext'
import { push, getLastIn, pop } from './StackMethods'

interface PropOperand{
  value: string;
  execute: () => number
}

const Operand = ({value, execute}: PropOperand) => {
  const {operatorStack, setOperatorStack, operandStack, setOperandStack} = useStackContext();

  const clickOperand = () => {
    push(operandStack, setOperandStack, value)
  }

  return (
    <Button value={value} onClick={clickOperand}/>
  )
}

export default Operand