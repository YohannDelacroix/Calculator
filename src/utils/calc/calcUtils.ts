/**
 * CalcUtils.tsx
 *
 * This file contains utility functions and constants for mathematical expression parsing, validation, 
 * and evaluation. These functions are designed to handle operations such as:
 * - Converting infix expressions to postfix.
 * - Evaluating postfix expressions.
 * - Validating the syntax of infix expressions.
 * - Preprocessing infix expressions for proper evaluation.
 * - Managing mathematical operators and their priorities.
 * - Defining constants such as square root (√) and π (pi).
 *
 * Author: Yohann Delacroix
 * Date: December 31, 2024
 */

//Constants 
const SQUARE_ROOT = "\u221a";
const PI = "\u03c0";

/**
 * Interface representing an operator.
 * @property {string} op - The symbol of the operator (e.g., "+", "-", "*", "(").
 * @property {number} priority - The precedence level of the operator.
 * Operators with higher priority values are evaluated first in expressions.
 */
interface Operator{
    op: string;
    priority: number;
}


/**
 * List of supported operators and their precedence levels.
 *
 * This array defines the operators that can be used in expressions, 
 * along with their associated priority. The priority is used to determine
 * the order of operations during expression evaluation.
 *
 * Priority levels:
 * - 0: Parentheses ("(" and ")") are used for grouping and do not have intrinsic priority.
 * - 1: Low-precedence operators like addition ("+") and subtraction ("-").
 * - 2: Medium-precedence operators like multiplication ("*"), division ("/"), and modulo ("%").
 * - 3: High-precedence operators like exponentiation ("^") and square root.
 * 
 * Note:
 * - The special constants `SQUARE_ROOT` and `PI` are treated as operators for simplicity.
 */
const operatorList: Operator[] = [
    {op:"(", priority:0},
    {op:")", priority:0},
    {op:"+", priority:1}, 
    {op:"-", priority:1},
    {op:"*", priority:2},
    {op:"/", priority:2},
    {op:"%", priority:2},
    {op:"^", priority:3},
    {op:SQUARE_ROOT, priority:3},
    {op:PI, priority:3}
]

/**
 * Validates the syntax of an infix expression.
 *
 * This function checks whether the given infix expression is syntactically valid.
 * It ensures that operators, operands, parentheses, and special symbols (e.g., PI) 
 * are arranged correctly and that no invalid combinations occur.
 *
 * @param {string[]} infix - The infix expression to validate, represented as an array of strings.
 * Each string corresponds to an operator, operand, parenthesis or function
 * @returns {boolean} Returns `true` if the infix expression is valid.
 * @throws {Error} Throws an error if the expression contains:
 * - Consecutive or misplaced operators.
 * - Unbalanced parentheses.
 * - Invalid tokens.
 * - Incorrect use of the PI symbol or decimal points.
 * - Other syntactic errors.
 */
export const isValidInfixExpression = (infix: string[]) => {
    let openingCount: number = 0; // Tracks the number of opening parentheses.
    let closingCount: number = 0; // Tracks the number of closing parentheses.

    for(let i = 0; i < infix.length; i++){
        //First checking if the token is an operator, to avoid useless checking with operands
        if(isOperator(infix[i])){
            const lastIndex: number = infix.length - 1;
            
            if(i === lastIndex && infix[i] !== ")" && infix[i] !== PI) 
            {
                //If the last token is an operator, that is not a closing parenthesis or a PI symbol, throw an error
                throw new Error("Last token is an operator");
            }

            if(i === 0 && infix[i] !== "-" && infix[i] !== "(" && infix[i] !== SQUARE_ROOT && infix[i] !== PI) {
                //If the first token is an operator, that is not an opening parenthesis, a minus, a square root function , invalid
                throw new Error("First token typed is an operator")
            } 

            if(i !== lastIndex && infix[i] !== PI){ //Prevent out of range error caused by i+1, and PI should not be considered in the consecutives operators
                if (
                    isOperator(infix[i + 1]) &&
                    infix[i + 1] !== SQUARE_ROOT &&
                    infix[i + 1] !== "-" &&     //Allow substractions with negative numbers 9 - -8
                    infix[i + 1] !== "(" &&
                    infix[i] !== ")" &&
                    infix[i + 1] !== PI
                ) {
                    //Ensure no two consecutive operators
                    throw new Error(`Two consecutives operators, i = ${i}`);
                }
            }

            if(isOperatorAMinus(infix[i+1]) && isOperatorAMinus(infix[i+2])){
                //Three consecutives minus operators should throw an error
                throw new Error("Three consecutives minus are not allowed");
            }

            if(i !== lastIndex){ //Prevent out of range error if PI is the last token of the stack
                if(infix[i] === PI && infix[i+1].charAt(0) === "."){
                    //Typing something like "PI.3" must throw an error
                    throw new Error("It's not allowed to combine decimals with PI symbol")
                }
            }
            
            //Count opening and closing parenthesis
            if(infix[i] === "(") openingCount += 1
            if(infix[i] === ")") closingCount += 1
         }

         //Handle invalid tokens (neither operand nor operator)
         if(!isOperator(infix[i]) && !isOperand(infix[i])){
            throw new Error("Not an operand nor an operator")
         } 
    }

    if(openingCount !== closingCount) throw new Error("The number of opening parenthesis and the closing parenthesis does not equal") //Parenthesis not correctly opened and/or closed

    // If all checks pass, the infix expression is valid.
    return true
}

/**
 * Prepares an infix expression for calculation by ensuring that necessary operators 
 * (such as multiplication) are added where needed, and by handling special cases such 
 * as the negative sign or the usage of the constant PI.
 *
 * This function scans through the input infix expression and modifies it to ensure 
 * that all operands are correctly separated by appropriate operators, particularly 
 * handling cases where implicit multiplication is required (e.g., "3(2 + 1)" should 
 * become "3*(2 + 1)"). It also deals with cases where a "-" sign is used for negative 
 * numbers or subtraction, and where PI is represented by its actual value.
 *
 * @param {string[]} infix_src - The original infix expression as an array of strings.
 * Each string represents an operand, operator, or parenthesis in the expression.
 * @returns {string[]} The modified infix expression as an array of strings, ready for calculation.
 */
export const prepareInfixForCalculation = (infix_src: string[]): string[] => {
    let infix: string[] = [...infix_src];

    for(let i = 0; i < infix.length; i++){	
        // CASE 1: Implicit multiplication to the right of an operand or closing parenthesis
        if( isOperand(infix[i]) || infix[i] === ")" ){
            if( infix[i+1] === "(" || isFunction(infix[i+1]) ){ 
                infix.splice(i+1, 0, "*");    // Insert "*" between operand and function/parenthesis
            }
        }

        // CASE 2: Implicit multiplication to the left of the current token
        if( infix[i] === PI || infix[i] === ")"){
            if( isOperand(infix[i+1]) || infix[i+1] === PI || infix[i+1] === "("){ 
                infix.splice(i+1, 0, "*");    // Insert "*" between operand and following operator/parenthesis
            }
        }

        // CASE 3: Handling the negative sign "-" to represent negative numbers
        if( infix[i] === "-" ){
            if( i === 0 ){ // If the minus sign is the first element, treat as -1
                infix[i] = "-1"
                infix.splice(i+1, 0, "*");    // Insert multiplication after the -1 
            }
            else{ // If the minus sign is before a parenthesis, a function or if there is two consecutive minus sign
                if(infix[i+1] === "(" || 
                    isFunction(infix[i]) || (isOperand(infix[i]+1) && isOperator(infix[i-1]) )){
                    infix[i] = "-1";    
                    infix.splice(i+1, 0, "*");    // Insert multiplication after the -1 	
                }
            }
        }

        // CASE 4: Replace the symbol for PI with its numeric value
        if(infix[i] === PI){   
            infix[i] = Math.PI.toString();
        }
    }

    return infix
}

/**
 * Converts an infix expression (e.g., "3 + 5 * (2 - 8)") into a postfix expression 
 * (e.g., "3 5 2 8 - * +") using the Shunting Yard algorithm.
 * 
 * The infix expression is a mathematical expression where operators are written 
 * between operands (e.g., "3 + 5"). The postfix expression, on the other hand, 
 * places operators after their operands (e.g., "3 5 +").
 * 
 * This function processes each token (operand, operator, or parenthesis) in the 
 * infix expression, applying the rules of precedence and associativity to 
 * build the corresponding postfix expression.
 * 
 * @param {string[]} infix - The infix expression to be converted, represented as an array of strings.
 * Each string is either an operand (number), operator (e.g., "+", "-", "*", "/"), or parenthesis.
 * @returns {string[]} The postfix expression as an array of strings, where operands appear first,
 * followed by operators in correct order of evaluation.
 * @throws {Error} Throws an error if the infix expression is invalid or contains unmatched parentheses.
 */
export const toPostfix = (infix: string[]): string[] => {
    let postfix: string[] = []; // Array to store the final postfix expression
    let operatorStack: string[] = []; // Stack to temporarily hold operators and parentheses

    // Iterate through each token in the infix expression
    for(let i = 0; i < infix.length; i++){
        //When token is an operand, add it to the postfix expression
        if(isOperand(infix[i])){
            postfix.push(infix[i])
        }
        //when token is an operator
        else if(isOperator(infix[i])){
            if(infix[i] === "("){
                // If the token is an opening parenthesis, push it onto the operator stack
                operatorStack.push(infix[i])
            }
            else if(infix[i] === ")"){
                // If the token is a closing parenthesis, pop operators from the stack
                // until an opening parenthesis is found
                while(operatorStack[operatorStack.length-1] !== "("){
                    let lastOperator: string | undefined = operatorStack.pop()
                    if(lastOperator !== undefined) postfix.push(lastOperator)
                }
                operatorStack.pop()
            }
            else{
                // If the token is an operator, pop operators from the stack to the postfix expression
                if(operatorStack.length === 0){
                    operatorStack.push(infix[i])
                }
                else{
                    while(operatorStack.length > 0 && hasPriorityOn(operatorStack[operatorStack.length-1], infix[i])){
                        let lastOperator: string | undefined = operatorStack.pop()
                        if(lastOperator !== undefined) postfix.push(lastOperator)
                    }

                    operatorStack.push(infix[i])
                }
            }
        }
    }

    //Clear the operator stack after processing all the tokens
    while(operatorStack.length > 0){
        let lastOperator: string | undefined = operatorStack.pop()
        if(lastOperator !== undefined) postfix.push(lastOperator)
    }
    
    return postfix;
}

//Rounding results to ensure decimal numbers are exact
const roundResult = (value: number, decimals: number = 10): number => {
    return parseFloat(value.toFixed(decimals));
};

/**
 * Algorithm evaluating a postfix expression and returns the result.
 * @param postfix - The postfix expression as an array of strings.
 * @returns The result of the evaluation as a string.
 * @throws Error if the expression contains undefined operators or operands.
 */
export const evaluatePostfixExpression = (postfix: string[]) => {
    let stack: string[] = []

    postfix.forEach( token => {
        // If the token is an operand, push it to the stack
        if(isOperand(token)) stack.push(token)
        // If the token is a function (e.g., square root), perform the function and push the result to the stack
        else if(isFunction(token)){
            let lastValue = stack.pop();

            let lastValueAsNumber: number;
            if(lastValue !== undefined){
                lastValueAsNumber = parseFloat(lastValue)
            }
            else throw new Error("Undefined last number")

            let result: number = 0;
            if(token === SQUARE_ROOT) result = Math.sqrt(lastValueAsNumber)

            let result_str: string = result.toString()
            stack.push(result_str)
        }
        // If the token is an operator, pop two operands, perform the operation, and push the result to the stack
        else if(isOperator(token)){
            let num1 = stack.pop()
            let num2 = stack.pop()

            let nm1: number;
            let nm2: number;
            if(num1 !== undefined && num2 !== undefined){
                nm1 = parseFloat(num1)
                nm2 = parseFloat(num2)
            }
            else throw new Error("Undefined num1 and/or num2")

            let result: number = 0;
            if(token === "+") result = nm1 + nm2;
            else if(token === "-") result = roundResult(nm2 - nm1);
            else if(token === "*") result = roundResult(nm2 * nm1);
            else if(token === "/") result = roundResult(nm2 / nm1);
            else if(token === "^") result = roundResult(Math.pow(nm2, nm1));
            else if(token === "%") result = roundResult(nm2 % nm1);
            else throw new Error("ERROR: Unknow operator")        

            let result_str: string = result.toString()
            stack.push(result_str)
        }
    })

    // The final result should be the only item left in the stack
    if(stack.length !== 1) {
        throw new Error("Invalid postfix expression: Stack has more than one value after evaluation.");
    }

    return stack[0]
}




//Is the character an operand ? (a number)
export const isOperand = (c: string) => {
    return !isNaN(+c) || c === "."
}

//Is the character an operator ? (e.g + , - , ())
export const isOperator = (c: string) => {
    const operatorSet: Set<string> = new Set(operatorList.map(op => op.op));
    return operatorSet.has(c);
}

//Is the token a minus ?
export const isOperatorAMinus = (token: string) => {
    return token === "-";
}

//Is the character a function (e.g square root)
export const isFunction = (c: string) => {
    if(isOperator(c)){
        if(c === SQUARE_ROOT || c === PI){
            return true;
        }
    }
    else return false;
}

/**
 * Determines if the first operator op1 has higher priority than the second operator op2.
 * Operators can be *, +, -, () or % for example
 * 
 * @param op1 - The first operator as a string 
 * @param op2 - The second operator as a string.
 * @returns `true` if `op1` has a higher priority than `op2`, `false` otherwise.
 * 
 * @throws Error if `op1` or `op2` is undefined.
 * @throws Error if one or both operators are not found in the `operatorList`.
 */
export const hasPriorityOn = (op1: string, op2: string) => {
    if(op1 === undefined) throw new Error("string op1 undefined")
    if(op2 === undefined) throw new Error("string op2 undefined")

    // Find operators in the predefined operator list
    const operator1 = operatorList.find(op => op.op === op1);
    const operator2 = operatorList.find(op => op.op === op2);

    // If both operators are found, compare their priorities
    if(operator1 && operator2){
        return operator1.priority > operator2.priority;
    }

    // If one or both operators are not found, throw an error
    throw new Error(`Priority check failed: Operator ${op1} or ${op2} could not be found in operatorList`);
}
