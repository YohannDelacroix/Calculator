import React from 'react'
import * as STACK from "../Stack/StackMethods"

interface screenProp {
  stack: string[]
}

const Screen = ({stack}: screenProp) => {


  return (
    <div>{STACK.toString(stack)}</div>
  )
}

export default Screen