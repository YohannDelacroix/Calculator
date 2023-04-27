import React, { useEffect } from 'react';
import './App.css';
import Screen from './components/Pane/Screen';
import { useStackContext } from './StackContext';
import Button from './components/Button/Button';
import * as STACK from "./components/Stack/StackMethods"
import * as PSTIN from "./hooks/Postfix_Infix"

function App() {

    const commands = [
      "<-","(",")","mod","pi",
      "7","8","9","+","sq",
      "4","5","6","*","^",
      "1","2","3","-","=",
      "0",",","%","/"
    ]

    const {stack, setStack, operandStack, setOperandStack} = useStackContext();

    const pushIntoOperandStack = (value: string) => {
      STACK.push(operandStack, setOperandStack, [value])
    }



    const handleOperator = (value: string) => {
      let number = STACK.toString(operandStack)
      STACK.emptyStack(operandStack, setOperandStack)
      STACK.push(stack, setStack, [number, value])
    }

    const evaluate = () => {
      let number = STACK.toString(operandStack)
      STACK.emptyStack(operandStack, setOperandStack)
      STACK.push(stack, setStack, [number])
    }

  

    return (
      <main>
        <section className="keyboard">
          <section className="screen">
           <Screen value={846} />
          </section>

          {
            /*
              <Operand value="<-" execute={something} />
          <Operator notation="(" execute={something} />
          <Operator notation=")" execute={something} />

          <Operator notation="mod" execute={something} />
          <Operand value="pi" execute={something} />

          <Operand value="7" execute={something} />
          <Operand value="8" execute={something} />
          <Operand value="9" execute={something} />

          <Operator notation="+" execute={something} />
          <Operator notation="sq" execute={something} />


          <Operand value="4" execute={something} />
          <Operand value="5" execute={something} />
          <Operand value="6" execute={something} />

          <Operator notation="*" execute={something} />
          <Operator notation="^" execute={something} />


          
          <Operand value="1" execute={something} />
          <Operand value="2" execute={something} />
          <Operand value="3" execute={something} />

          <Operator notation="-" execute={something} />
          
          
          <Operand value="0" execute={something} />
          <Operand value="," execute={something} />
          <Operator notation="%" execute={something} />
          <Operator notation="/" execute={something} />


          <Button value="=" onClick={evaluate} />

            */
          }
          
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
