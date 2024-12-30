import { evaluatePostfixExpression, prepareInfixForCalculation, toPostfix } from "../Calc/CalcUtils";
import * as StackUtils from "./StackUtils"


//enum stackActionType contains all the possibles types we can find in the app 
export enum stackActionType {
    ADD_TO_STACK = 'ADD_TO_STACK',         
    REPLACE_STACK = 'REPLACE_STACK',         
    REMOVE_FROM_STACK = 'REMOVE_FROM_STACK',        
    CLEAR = 'CLEAR',   
    EVALUATE = 'EVALUATE'
}

interface stackAction{
    type: stackActionType;
    tokens: string[]
}

interface stackState{
    stack: string[]
}

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