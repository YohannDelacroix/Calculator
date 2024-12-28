import React, { useRef, useEffect } from 'react'
import * as StackUtils from "../../Stack/StackUtils"

interface ScreenProps {
  calculatorStack: string[];
}

const Screen = ({ calculatorStack }: ScreenProps) => {
  const screenContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (screenContainerRef.current) {
      screenContainerRef.current.scrollLeft = screenContainerRef.current.scrollWidth;
    }
  }, [calculatorStack]);

  return (
    <div className="screen-numeric-value" ref={screenContainerRef} data-testid="screen">
      {StackUtils.toString(calculatorStack)}
    </div>
  )
}

export default Screen;