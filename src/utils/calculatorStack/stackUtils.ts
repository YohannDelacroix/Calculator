/**
 * StackUtils.tsx
 *
 * Utility functions to facilitate operations on stacks
 *
 * Author: Yohann Delacroix
 * Date: 2024-01-25
 *
 */

/**
 * Retrieves the last element from the stack.
 * @param stack - The stack represented as an array of strings.
 * @returns The last element in the stack as a string. 
 *          If the stack is empty, returns an empty string.
 */
export const getLastIn = (stack: string[]) => {
    if(stack.length === 0) return ""
    return stack[stack.length-1]
}

/**
 * Converts an array of strings into a single concatenated string.
 * This function is used in the Screen component to display the current expression or result
 * by concatenating the elements of the stack.
 * @param stack - The array of strings to be concatenated.
 * @returns A single string resulting from the concatenation of all elements in the array.
 */
export const toString = (stack: string[]) => {
    return stack.reduce((result, c) => result + c, "");
};