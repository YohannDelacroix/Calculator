/* Calc.tsx 
    Contains all the mathematical logic for the calculation
*/

//Constants
const SQUARE_ROOT = "\u221a";
const PI = "\u03c0";

interface Operator{
    op: string;
    priority: number;
}

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

//Check if the infix exp is valid 
export const isValidInfixExpression = (infix: string[]) => {
    let openingCount: number = 0;
    let closingCount: number = 0;

    for(let i = 0; i < infix.length; i++){
        if(isOperator(infix[i])){

            if(i === infix.length - 1 && infix[i] !== ")" && infix[i] !== PI) 
            {
                throw new Error("Last token is an operator");
                //If the last is an operator , invalid expression
            }

            if(i === 0 && infix[i] !== "-" && infix[i] !== "(" && infix[i] !== SQUARE_ROOT && infix[i] !== PI) {
                throw new Error("First typed is an operator")
                //If the first is an operator, (except - and ) and sqr ) , invalid
            } 

            if(i !== infix.length -1 && infix[i] !== PI){ //infix.length -1 because Not needed to check the last operator because no one else can follow it
                if(isOperator(infix[i+1]) && infix[i+1] !== SQUARE_ROOT && infix[i+1] !== "-" && infix[i+1] !== "(" && infix[i] !== ")" && infix[i+1] !== PI) {
                    throw new Error(`Two consecutives operators, i = ${i}`);
                    //Two consecutive operators
                }
            }
         }

         if(!isOperator(infix[i]) && !isOperand(infix[i])){
            throw new Error("Not an operand nor an operator")
         } 

         if(infix[i] === "(") openingCount += 1
         if(infix[i] === ")") closingCount += 1
    }

    if(openingCount !== closingCount) return false //Parenthesis not correctly opened and/or closed
    return true
}

//Making a prescan and adapting it to be calculated
export const prepareInfixForCalculation = (infix_src: string[]): string[] => {
    let infix: string[] = [...infix_src];

    for(let i = 0; i < infix.length; i++){	
        // CASE OF NO * TYPED operator at the right
        if( isOperand(infix[i]) || infix[i] === ")" ){
            if( infix[i+1] === "(" || isFunction(infix[i+1]) ){ 
                infix.splice(i+1, 0, "*");    //Ajouter après elem : "*"
            }
        }

        // CASE OF NO * TYPED operator at the left
        if( infix[i] === PI || infix[i] === ")"){
            if( isOperand(infix[i+1]) || infix[i+1] === PI || infix[i+1] === "("){ 
                infix.splice(i+1, 0, "*");    //Ajouter après elem : "*"
            }
        }

        //CASE OF "-" 
        if( infix[i] === "-" ){
            if( i === 0 ){ //elem est premier de sa liste
                infix[i] = "-1"
                infix.splice(i+1, 0, "*");    //Ajouter après elem : "*"	
            }
            else{
                if(infix[i+1] === "(" || 
                    isFunction(infix[i]) || (isOperand(infix[i]+1) && isOperator(infix[i-1]) )){
                    infix[i] = "-1";
                    infix.splice(i+1, 0, "*");    //Ajouter après elem : "*"	
                }
            }
        }

        //Case of using of symbol PI PI
        if(infix[i] === PI){   
            infix[i] = Math.PI.toString();
        }
    }

    return infix
}

//convert a infix expression into postfix expression
export const toPostfix = (infix: string[]): string[] => {
    let postfix: string[] = [];
    let operatorStack: string[] = [];

    for(let i = 0; i < infix.length; i++){
        //When token is an operand
        if(isOperand(infix[i])){
            postfix.push(infix[i])
        }
        //when token is an operator
        else if(isOperator(infix[i])){
            if(infix[i] === "("){
                operatorStack.push(infix[i])
            }
            else if(infix[i] === ")"){
                while(operatorStack[operatorStack.length-1] !== "("){
                    let lastOperator: string | undefined = operatorStack.pop()
                    if(lastOperator !== undefined) postfix.push(lastOperator)
                }
                operatorStack.pop()
            }
            else{
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

    //Clear the operator stack at the end
    while(operatorStack.length > 0){
        let lastOperator: string | undefined = operatorStack.pop()
        if(lastOperator !== undefined) postfix.push(lastOperator)
    }
    
    return postfix;
}


//Evaluate a postfix expression and return the result
export const evaluatePostfixExpression = (postfix: string[]) => {
    let stack: string[] = []

    postfix.forEach( token => {
        if(isOperand(token)) stack.push(token)
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
            else if(token === "-") result = nm2 - nm1;
            else if(token === "*") result = nm2 * nm1;
            else if(token === "/") result = nm2 / nm1;
            else if(token === "^") result = Math.pow(nm2, nm1)
            else if(token === "%") result = nm2 % nm1;
            else throw new Error("ERROR: Unknow operator")        

            let result_str: string = result.toString()
            stack.push(result_str)
        }
    })

    return stack[0]
}


//Is the character an operand ?
export const isOperand = (c: string) => {
    return !isNaN(+c) || c === "."
}

//Is the character an operator ?
export const isOperator = (c: string) => {
    const operatorSet: Set<string> = new Set(operatorList.map(op => op.op));
    return operatorSet.has(c);
}

//For the moment no longer used anywhere in the program
export const isFunction = (c: string) => {
    if(isOperator(c)){
        if(c === SQUARE_ROOT || c === PI){
            return true;
        }
    }
    else return false;
}

//Does op1 have priority on op2 ? 
export const hasPriorityOn = (op1: string, op2: string) => {
    if(op1 === undefined) throw new Error("string op1 undefined")
    if(op2 === undefined) throw new Error("string op2 undefined")


    const operator1 = operatorList.find(op => op.op === op1);
    const operator2 = operatorList.find(op => op.op === op2);

    if(operator1 && operator2){
        return operator1.priority > operator2.priority;
    }

    throw new Error("One or both operator could not be found")
}
