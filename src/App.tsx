import React, { useEffect, useReducer } from 'react';
import './App.css';
import Screen from './components/Screen/Screen';
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

    useEffect( () => {
      console.log("Stack: ", stack);
    }, [stack])



    
    const pushIntoStack = (value: string) => {

      if(PSTIN.isOperand(value)){

        if(stack.stack.length == 0 || PSTIN.isOperator(STACK.getLastIn(stack.stack))){
          dispatchStack({type: stackActionKind.PUSH, payload: [value]})
        }
        else{ //The last in stack is an operand
          let completeValue = STACK.getLastIn(stack.stack) + value
          dispatchStack({type: stackActionKind.POP, payload: []})
          dispatchStack({type: stackActionKind.PUSH, payload: [completeValue]})
        } 

      }
      else if(PSTIN.isOperator(value)){
        dispatchStack({type: stackActionKind.PUSH, payload: [value]})
      }
    }

    const evaluate = () => {
      dispatchStack({type: stackActionKind.EVALUATE, payload: []})
    }

  
    return (
      <main>
        <section className="keyboard">
          <section className="screen">
           <Screen stack={stack.stack} />
          </section>
        
          {
            commands.map( c => {
              if(c === "=") return <Button value={c} key={c} onClick={evaluate} />
              else if(c === "<-") return <Button value={c} key={c} onClick={evaluate} />
              else if(PSTIN.isOperator(c)) return <Button value={c} key={c} onClick={pushIntoStack} />
              else return <Button value={c} key={c} onClick={pushIntoStack} />
            })
          }
          
         
        </section>
        
      </main>
     
    );
}

export default App;
