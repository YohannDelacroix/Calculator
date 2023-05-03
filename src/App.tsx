import React, { useEffect, useReducer } from 'react';
import './App.css';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';
import * as STACK from "./components/Stack/StackMethods"
import * as PSTIN from "./Calc/Calc"
import { StackReducer, stackActionKind } from './components/Stack/StackReducer';


function App() {

    const commands = [
      "<-","(",")","pi","AC",
      "7","8","9","+","sq",
      "4","5","6","*","^",
      "1","2","3","-","=",
      "0",",","%","/"
    ]


    const [stack, dispatchStack] = useReducer(StackReducer, { stack: []})

    useEffect( () => {
      console.log("Stack: ", stack.stack);
    }, [stack])



    
    const pushIntoStack = (value: string) => {

      if(PSTIN.isOperand(value)){
        let lastIn = STACK.getLastIn(stack.stack)

        if(lastIn === "-" && (PSTIN.isOperator(STACK.getSecondFromEnd(stack.stack)) || STACK.getSecondFromEnd(stack.stack) === "")){
          let completeValue = STACK.getLastIn(stack.stack) + value
          dispatchStack({type: stackActionKind.POP, payload: [STACK.getLastIn(stack.stack)]})
          dispatchStack({type: stackActionKind.PUSH, payload: [completeValue]})
        }
        else if(stack.stack.length == 0 || PSTIN.isOperator(lastIn)){
          dispatchStack({type: stackActionKind.PUSH, payload: [value]})
        }
        else{ //The last in stack is an operand
          let completeValue = STACK.getLastIn(stack.stack) + value
          dispatchStack({type: stackActionKind.POP, payload: [STACK.getLastIn(stack.stack)]})
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


    //Back button, delete 1 character exactly
    const back = () => {
      let newStack = [...stack.stack]
      let last = newStack.pop()

      if(last == undefined) {
        console.error("Nothing to delete")
        return
      }
      dispatchStack({type: stackActionKind.EMPTY, payload: []})
      
      if(last.length > 1){
        dispatchStack({type: stackActionKind.PUSH, payload: [...newStack, last.substring(0, last.length-1)]})
      }
      else{
        dispatchStack({type: stackActionKind.PUSH, payload: [...newStack]})
      }
    }


    //AC button - reset the stack
    const handleAC = () => {
      dispatchStack({type: stackActionKind.EMPTY, payload: []})
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
              else if(c === "AC") return <Button value={c} key={c} onClick={handleAC} />
              else if(c === "<-") return <Button value={c} key={c} onClick={back} />
              else return <Button value={c} key={c} onClick={pushIntoStack} />
            })
          }
          
         
        </section>
        
      </main>
     
    );
}

export default App;
