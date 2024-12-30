import { useEffect, useReducer } from 'react';
import * as StackUtils from "../utils/calculatorStack/StackUtils"
import * as CalcUtils from "../utils/calc/CalcUtils"
import { StackReducer, stackActionType } from '../utils/calculatorStack/StackReducer';


export const useCalculator = () => {
        //Initializing stack with empty array 
        const [stackState, dispatchStack] = useReducer(StackReducer, { stack: []})
    
        useEffect( () => {
          //console.log("Stack: ", stackState.stack);
        }, [stackState])
    
    
        //Given a character typed by the user, add this character to the stack
        const pushToStack = (token: string): void => {
          if(CalcUtils.isOperand(token)){
              const lastToken = StackUtils.getLastIn(stackState.stack);
              
              //When the logic must push a new operand after an empty stack or an operator
              if(stackState.stack.length === 0 || CalcUtils.isOperator(lastToken)){
                  dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: [token]})
              }
              //When the lastToken token typed is an operand : create a complete number with the last token
              else{ 
                  let completeValue = lastToken + token
                  const updatedStack = [
                    ...stackState.stack.slice(0, -1), completeValue
                  ]
                  dispatchStack({type: stackActionType.REPLACE_STACK, tokens: updatedStack});
              } 
          }
          else if(CalcUtils.isOperator(token)){
            dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: [token]})
          }
        }
    
        //Evaluate an expression typed by the user
        const evaluateExpression = () => {
          let valid: boolean = false;
    
          try{
            valid = CalcUtils.isValidInfixExpression(stackState.stack)
          }catch(error){
            console.error(error);
          }
          
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

        return {
            stackState,
            pushToStack,
            evaluateExpression,
            deleteLastCharacter,
            resetStack,
        };
}