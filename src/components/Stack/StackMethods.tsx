import { Dispatch, SetStateAction } from "react";


//Push a value on top of Stack
export const push = (stack: string[], setStack: Dispatch<SetStateAction<string[]>>, value: string[]) => {
    console.log(value)
    setStack([...stack, ...value])
}

export const getLastIn = (stack: string[]) => {
    return stack[stack.length-1]
}

export const pop = (stack: string[], setStack: Dispatch<SetStateAction<string[]>>) => {
    if(stack.length > 0){
        let lastValue = stack.pop();
        setStack([...stack]);
        return lastValue;
    }
}

export const emptyStack = (stack: string[], setStack: Dispatch<SetStateAction<string[]>>) => {
    setStack([])
}


//convert the string array into a string
export const toString = (stack: string[]) => {
    let result: string = ""
    stack.map( c => result = result + c)
    return result
}


