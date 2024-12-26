import React, { useEffect, useReducer } from 'react';
import './App.css';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';
import * as StackUtils from "./Stack/StackUtils"
import * as CalcUtils from "./Calc/CalcUtils"
import { StackReducer, stackActionType } from './Stack/StackReducer';


function App() {
    const buttonCommands = [
      "<-","(",")","\u03c0","AC",
      "7","8","9","+","\u221a",
      "4","5","6","*","^",
      "1","2","3","-","=",
      "0",".","%","/"
    ]

    //Initializing stack with empty array 
    const [stackState, dispatchStack] = useReducer(StackReducer, { stack: []})

    useEffect( () => {
      console.log("Stack: ", stackState.stack);
    }, [stackState])


    //Given a character typed by the user, add this character to the stack
    const pushToStack = (token: string): void => {
      if(CalcUtils.isOperand(token)){
        if(stackState.stack.length === 0 || CalcUtils.isOperator(StackUtils.getLastIn(stackState.stack))){
          dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: [token]})
        }
        else{ //The last in stack is an operand
          let completeValue = StackUtils.getLastIn(stackState.stack) + token
          dispatchStack({type: stackActionType.REMOVE_FROM_STACK, tokens: [StackUtils.getLastIn(stackState.stack)]})
          dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: [completeValue]})
        } 
      }
      else if(CalcUtils.isOperator(token)){
        dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: [token]})
      }
    }

    //Evaluate an expression typed by the user
    const evaluateExpression = () => {
      let valid: boolean = CalcUtils.isValidInfixExpression(stackState.stack)

      if(!valid) {
        dispatchStack({type: stackActionType.CLEAR, tokens: []})
        dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: ["ERROR"]})
      }
      else dispatchStack({type: stackActionType.EVALUATE, tokens: []})
    }

    //Back button, delete 1 character exactly
    const deleteLastCharacter = () => {
      let newStack = [...stackState.stack]
      let last = newStack.pop()

      if(last === undefined) {
        console.error("Nothing to delete")
        return
      }
      dispatchStack({type: stackActionType.CLEAR, tokens: []})
      
      if(last.length > 1){
        dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: [...newStack, last.substring(0, last.length-1)]})
      }
      else{
        dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: [...newStack]})
      }
    }

    //AC button - reset the stack
    const resetStack = () => {
      dispatchStack({type: stackActionType.CLEAR, tokens: []})
    }

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
