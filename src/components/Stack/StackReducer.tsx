import { evalPostfix, preScan, toPostfix } from "../../Calc/Calc";
import * as STACK from "./StackMethods"

export enum stackActionKind {
    PUSH = 'PUSH',
    POP = 'POP',
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
        case stackActionKind.PUSH:
            console.log("PUSH")
            return {...state, stack: [...state.stack, ...payload]}
        case stackActionKind.POP:
            if(STACK.getLastIn(state.stack) === payload[0])
            state.stack.pop()
            return {...state, stack: [...state.stack]}
        case stackActionKind.EMPTY:
            return {...state, stack: []}
        case stackActionKind.EVALUATE:
            let infixScanned: string[] = preScan(state.stack)
            let postfix: string[] = toPostfix(infixScanned)
            let result: string = evalPostfix(postfix)
            return {...state, stack: [result]}
        default: 
            return state
    }
}