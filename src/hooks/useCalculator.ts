/**
 * Custom React hook to manage the calculator's stack and handle user inputs.
 * 
 * This hook manages the state of the stack using `useReducer` and provides several functions 
 * to interact with the stack, such as:
 * - `pushToStack`: Adds an operand or operator to the stack.
 * - `evaluateExpression`: Evaluates the current expression in the stack.
 * - `deleteLastCharacter`: Deletes the last character entered in the stack.
 * - `resetStack`: Clears the stack completely.
 * 
 * It interacts with utility functions from `CalcUtils` and `StackUtils` for validation, 
 * infix-to-postfix conversion, and stack manipulation.
 * 
 * @returns {Object} The hook returns an object containing:
 *   - `stackState`: The current state of the stack.
 *   - `pushToStack`: Function to add a token to the stack.
 *   - `evaluateExpression`: Function to evaluate the expression.
 *   - `deleteLastCharacter`: Function to remove the last character from the stack.
 *   - `resetStack`: Function to reset the stack.
 */

import { useEffect, useReducer } from 'react';
import * as StackUtils from "../utils/calculatorStack/StackUtils"
import * as CalcUtils from "../utils/calc/CalcUtils"
import { StackReducer, stackActionType } from '../utils/calculatorStack/StackReducer';


export const useCalculator = () => {
        //Initializing stack with empty array 
        const [stackState, dispatchStack] = useReducer(StackReducer, { stack: []})
    
        /**
         * Adds a token to the stack.
         * If the token is an operand, it will either create a new value or append to the last operand.
         * If it's an operator, it is simply added to the stack.
         * 
         * @param token - The token (operand or operator) to add to the stack.
         */
        const pushToStack = (token: string): void => {
          if(CalcUtils.isOperand(token)){
              const lastToken = StackUtils.getLastIn(stackState.stack);
              
              // When the stack is empty or the last token is an operator, add the operand
              if(stackState.stack.length === 0 || CalcUtils.isOperator(lastToken)){
                  dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: [token]})
              }
              // When the last token is an operand, combine the last token with the new one
              else{ 
                  let completeValue = lastToken + token
                  const updatedStack = [
                    ...stackState.stack.slice(0, -1), completeValue
                  ]
                  dispatchStack({type: stackActionType.REPLACE_STACK, tokens: updatedStack});
              } 
          }
          // If the token is an operator, just add it to the stack
          else if(CalcUtils.isOperator(token)){
            dispatchStack({type: stackActionType.ADD_TO_STACK, tokens: [token]})
          }
        }
    
        /**
         * Evaluates the current expression in the stack.
         * It first validates the expression. If invalid, the stack is cleared and an error message is added.
         * If valid, the expression is evaluated, and the result is added to the stack.
         */
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
    
        /**
         * Deletes the last character in the stack.
         * If the last token has multiple characters, it removes one character from the token.
         * If the stack is empty or the last token has only one character, it is completely removed.
         */
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
    
        /**
         * Resets the stack by clearing all tokens.
         */
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