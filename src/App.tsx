import React from 'react';
import './App.css';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';
import { useCalculator } from './hooks/useCalculator';


function App() {
    const buttonCommands = [
      "<-","(",")","\u03c0","AC",
      "7","8","9","+","\u221a",
      "4","5","6","*","^",
      "1","2","3","-","=",
      "0",".","%","/"
    ]

    const {
      stackState,
      pushToStack,
      evaluateExpression,
      deleteLastCharacter,
      resetStack,
    } = useCalculator();

    return (
      <main>
          <header><p>CALCULATOR</p></header>
          <section className="calculator">
            <section className="screen">
              <Screen calculatorStack={stackState.stack} />
            </section>
            <section className="keyboard">
              {
                buttonCommands.map( c => {
                  if(c === "=") return <Button buttonValue={c} key={c} onButtonClick={evaluateExpression} />
                  else if(c === "AC") return <Button buttonValue={c} key={c} onButtonClick={resetStack} />
                  else if(c === "<-") return <Button buttonValue={c} key={c} onButtonClick={deleteLastCharacter} />
                  else return <Button buttonValue={c} key={c} onButtonClick={pushToStack} />
                })
              }
            </section>
          </section>
      </main>
    );
}

export default App;
