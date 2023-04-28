import React, { useEffect, useReducer } from 'react';
import './App.css';
import Screen from './components/Pane/Screen';
import Button from './components/Button/Button';
import * as STACK from "./components/Stack/StackMethods"
import * as PSTIN from "./hooks/Postfix_Infix"
import { StackReducer, stackActionKind } from './components/Stack/StackReducer';


function App() {

    const commands = [
      "<-","(",")","mod","pi",
      "7","8","9","+","sq",
      "4","5","6","*","^",
      "1","2","3","-","=",
      "0",",","%","/"
    ]


    const [stack, dispatchStack] = useReducer(StackReducer, { stack: []})
    const [operandStack, dispatchOperandStack] = useReducer(StackReducer, { stack: []})

    useEffect( () => {
      console.log("Stack: ", stack);
      console.log("Operand stack ", operandStack)
    }, [stack, operandStack])


    const pushIntoOperandStack = (value: string) => {
      dispatchOperandStack({type: stackActionKind.PUSH, payload: [value]})
    }



    const handleOperator = (value: string) => {
      let number = STACK.toString(operandStack.stack)
      dispatchOperandStack({type: stackActionKind.EMPTY, payload: []})
      dispatchStack({type: stackActionKind.PUSH, payload: [number, value]})
    }

    const evaluate = () => {
      let number = STACK.toString(operandStack.stack)
      dispatchOperandStack({type: stackActionKind.EMPTY, payload: []})
      dispatchStack({type: stackActionKind.PUSH, payload: [number]})
      dispatchStack({type: stackActionKind.EVALUATE, payload: []})
    }

  

    return (
      <main>
        <section className="keyboard">
          <section className="screen">
           <Screen value={846} />
          </section>
        
          {
            commands.map( c => {
              if(c === "=") return <Button value={c} key={c} onClick={evaluate} />
              else if(c === "<-") return <Button value={c} key={c} onClick={evaluate} />
              else if(PSTIN.isOperator(c)) return <Button value={c} key={c} onClick={handleOperator} />
              else return <Button value={c} key={c} onClick={pushIntoOperandStack} />
            })
          }
          
         
        </section>
        
      </main>
     
    );
}

export default App;
