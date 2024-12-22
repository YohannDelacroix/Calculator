import React, {useRef, useEffect} from 'react'
import * as STACK from "../../Stack/StackMethods"

interface screenProp {
  stack: string[]
}


const Screen = ({stack}: screenProp) => {
    const screenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if(screenRef.current){
        screenRef.current.scrollLeft = screenRef.current.scrollWidth;
      }
    }, [stack]);

    return (
      <div className="screen-numeric-value" ref={screenRef}>
        {STACK.toString(stack)}
      </div>
    )
}

export default Screen