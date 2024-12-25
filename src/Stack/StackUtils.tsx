import { Dispatch, SetStateAction } from "react";

//Push a value on top of Stack
export const pushValuesToStack = (stack: string[], setStack: Dispatch<SetStateAction<string[]>>, value: string[]) => {
    console.log(value)
    setStack([...stack, ...value])
}

//Get the second value from the beginning of the end to the left
export const getSecondValueFromEnd = (stack: string[]) => {
    if(stack.length < 2) return ""
    return stack[stack.length-2]
}

//Get the last in stack
export const getLastIn = (stack: string[]) => {
    if(stack.length === 0) return ""
    return stack[stack.length-1]
}

export const popValueFromStack = (stack: string[], setStack: Dispatch<SetStateAction<string[]>>) => {
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


