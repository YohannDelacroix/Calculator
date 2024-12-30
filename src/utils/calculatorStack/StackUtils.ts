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

//convert the string array into a string
export const toString = (stack: string[]) => {
    let result: string = ""
    stack.map( c => result = result + c)
    return result
}