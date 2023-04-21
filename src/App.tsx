import React from 'react';
import './App.css';
import Screen from './components/Pane/Screen';
import Operand from './components/Button/Operand';
import Operator from './components/Button/Operator';
import { useStackContext } from './StackContext';

function App() {

    const {operatorStack, setOperatorStack, operandStack, setOperandStack} = useStackContext();


    
    const something = () => {
      return 5.6
    }


    return (
      <main>

        <section className="keyboard">
          <section className="screen">
           <Screen value={846} />
          </section>
          <Operand value="<-" execute={something} />
          <Operand value="(" execute={something} />
          <Operand value=")" execute={something} />

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
          <Operator notation="pw" execute={something} />


          
          <Operand value="1" execute={something} />
          <Operand value="2" execute={something} />
          <Operand value="3" execute={something} />

          <Operator notation="-" execute={something} />
          
          
          <Operand value="0" execute={something} />
          <Operand value="," execute={something} />
          <Operator notation="%" execute={something} />
          <Operator notation="/" execute={something} />


          <Operator notation="=" execute={something} />
          
          
         
        </section>
        
      </main>
     
    );
}

export default App;
