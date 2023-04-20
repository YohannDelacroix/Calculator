import { Dispatch, SetStateAction } from "react";


//Push a value on top of Stack
export const push = (stack: string[], setStack: Dispatch<SetStateAction<string[]>>, value: string) => {
    setStack([...stack, value])
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