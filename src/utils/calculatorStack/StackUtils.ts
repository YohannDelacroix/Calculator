/**
 * StackUtils.tsx
 *
 * Utility functions to facilitate operations on stacks
 *
 * Author: Yohann Delacroix
 * Date: 2024-01-25
 *
 */

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