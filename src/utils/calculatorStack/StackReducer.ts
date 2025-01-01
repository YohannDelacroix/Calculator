/**
 * StackReducer.ts
 * 
 * This file contains the reducer logic for managing a stack of tokens in the application. 
 * It handles various actions related to the stack, including adding, removing, clearing, replacing, 
 * and evaluating tokens in the stack. The reducer supports the following actions:
 * 
 * - ADD_TO_STACK: Adds tokens to the current stack.
 * - REPLACE_STACK: Replaces the current stack with the provided tokens.
 * - REMOVE_FROM_STACK: Removes the top token from the stack if it matches the provided token.
 * - CLEAR: Clears the entire stack.
 * - EVALUATE: Converts the stack to a postfix expression, evaluates it, and updates the stack with the result.
 * 
 * The reducer makes use of utility functions from the `StackUtils` and `CalcUtils` modules to manipulate 
 * and evaluate the stack.
 * 
 * @module StackReducer
 * @author Yohann Delacroix
 * @date 01-01-2025
 */

import { evaluatePostfixExpression, prepareInfixForCalculation, toPostfix } from "../calc/CalcUtils";
import * as StackUtils from "./StackUtils"


/**
 * Enum representing the different action types for stack management.
 * This enum defines the possible actions that can be dispatched to modify the state of the stack.
 * Each action corresponds to a specific operation on the stack.
 * 
 * @enum stackActionType
 */
export enum stackActionType {
    ADD_TO_STACK = 'ADD_TO_STACK',         
    REPLACE_STACK = 'REPLACE_STACK',         
    REMOVE_FROM_STACK = 'REMOVE_FROM_STACK',        
    CLEAR = 'CLEAR',   
    EVALUATE = 'EVALUATE'
}

/**
 * Represents an action to be dispatched for modifying the stack state.
 * The action includes the type of the action and the tokens involved.
 * 
 * @interface stackAction
 * @property {stackActionType} type - The type of action to be performed on the stack (e.g., ADD_TO_STACK, REMOVE_FROM_STACK).
 * @property {string[]} tokens - The array of tokens associated with the action, such as operands or operators to manipulate the stack.
 */
interface stackAction{
    type: stackActionType;
    tokens: string[]
}


/**
 * Represents the state of the stack in the application.
 * The state holds an array of strings that represents the current contents of the stack.
 * 
 * @interface stackState
 * @property {string[]} stack - 
 */
interface stackState{
    stack: string[]
}

/**
 * Reducer function for managing the state of the stack.
 * 
 * This function handles all the actions described in the stackActionType enum
 * 
 * @param {stackState} state - The current state of the stack.
 * @param {stackAction} action - The action to be performed on the stack. It includes a type and tokens (array of strings).
 * @returns {stackState} - A new state object with the updated stack based on the action type.
 * 
 */
export const StackReducer = (state: stackState, action: stackAction) => {
    const { type, tokens } = action
    switch(type){
        case stackActionType.ADD_TO_STACK:
            return {...state, stack: [...state.stack, ...tokens]}
        case stackActionType.REPLACE_STACK:
            return {...state, stack:[...tokens]};
        case stackActionType.REMOVE_FROM_STACK:
            let lastItemInStack: string = tokens[0];
            if(StackUtils.getLastIn(state.stack) === lastItemInStack)
            state.stack.pop()
            return {...state, stack: [...state.stack]}
        case stackActionType.CLEAR:
            return {...state, stack: []}
        case stackActionType.EVALUATE:
            let infixScanned: string[] = prepareInfixForCalculation(state.stack)
            let postfix: string[] = toPostfix(infixScanned)
            let result: string = evaluatePostfixExpression(postfix)
            return {...state, stack: [result]}
        default: 
            return state
    }
}