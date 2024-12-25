import { evaluatePostfixExpression, prepareInfixForCalculation, toPostfix } from "../Calc/CalcUtils";
import * as StackUtils from "./StackUtils"

export enum stackActionKind {
    ADD_TO_STACK = 'ADD_TO_STACK',
    REMOVE_FROM_STACK = 'REMOVE_FROM_STACK',
    EMPTY = 'EMPTY',
    EVALUATE = 'EVALUATE',
    BACK = 'BACK'
}

interface stackAction{
    type: stackActionKind;
    payload: string[]
}

interface stackState{
    stack: string[]
}

export const StackReducer = (state: stackState, action: stackAction) => {
    const { type, payload } = action
    switch(type){
        case stackActionKind.ADD_TO_STACK:
            return {...state, stack: [...state.stack, ...payload]}
        case stackActionKind.REMOVE_FROM_STACK:
            let lastItemInStack: string = payload[0];
            if(StackUtils.getLastIn(state.stack) === lastItemInStack)
            state.stack.pop()
            return {...state, stack: [...state.stack]}
        case stackActionKind.EMPTY:
            return {...state, stack: []}
        case stackActionKind.EVALUATE:
            let infixScanned: string[] = prepareInfixForCalculation(state.stack)
            let postfix: string[] = toPostfix(infixScanned)
            let result: string = evaluatePostfixExpression(postfix)
            return {...state, stack: [result]}
        default: 
            return state
    }
}