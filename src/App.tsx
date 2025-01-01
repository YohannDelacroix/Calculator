/**
 * App component for the Calculator application.
 * 
 * This component sets up the UI layout for the calculator, including:
 * - A header with the app title ("CALCULATOR").
 * - A screen displaying the current stack of values.
 * - A keyboard with buttons representing calculator commands and digits.
 * 
 * The component uses the `useCalculator` hook to manage the stack state and 
 * provide functions for interacting with the calculator's state (push to stack, 
 * evaluate expression, delete last character, and reset stack).
 * 
 * Button commands are mapped to corresponding functions to handle user input.
 * 
 * @returns The complete UI layout of the calculator.
 */

import React from 'react';
import './App.css';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';
import { useCalculator } from './hooks/useCalculator';


function App() {
    // List of button commands for the calculator keyboard.
    // The special characters include:
    // - "<-" for backspace
    // - "AC" for clearing the calculator
    // - "\u03c0" for Pi symbol
    // - "\u221a" for the square root symbol
    // These values are used to render the calculator's keyboard and map the user input to actions.
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
