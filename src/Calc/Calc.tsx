const operatorList: any[] = [
    {op:"(", priority:0},
    {op:")", priority:0},
    {op:"+", priority:1}, 
    {op:"-", priority:1},
    {op:"*", priority:2},
    {op:"/", priority:2},
    {op:"^", priority:3},
    {op:"sq", priority:3}
]



//Check if the infix exp is valid 
export const isValidInfixExp = (infix: string[]) => {
    let openingCount: number = 0;
    let closingCount: number = 0;

    for(let i = 0; i < infix.length; i++){
        if(isOperator(infix[i])){
            if(i == infix.length - 1 && infix[i] !== ")") return false   //If the last is an operator , invalid expression
            if(i == 0 && infix[i] !== "-" && infix[i] !== "(") return false   //If the first is an operator, (except - and ) ) , invalid
            if(i !== infix.length -1){
                if(isOperator(infix[i+1]) && infix[i+1] !== "-" && infix[i+1] !== "(" && infix[i] !== ")") return false //Two consecutive operators
            }
         }

         if(!isOperator(infix[i]) && !isOperand(infix[i])) return false

         if(infix[i] === "(") openingCount += 1
         if(infix[i] === ")") closingCount += 1
    }

    if(openingCount !== closingCount) return false //Parenthesis not correctly opened and/or closed

    return true
}



//convert a infix expression into postfix expression
export const toPostfix = (infix: string[]): string[] => {
    console.log("INFIX : ", infix)

    let postfix: string[] = [];
    let operator: string[] = [];

    for(let i = 0; i < infix.length; i++){
        if(isOperand(infix[i])){
            postfix.push(infix[i])
        }
        else if(isOperator(infix[i])){
            if(infix[i] === "("){
                operator.push(infix[i])
            }
            else if(infix[i] === ")"){
                while(operator[operator.length-1] !== "("){
                    let lastOperator: string | undefined = operator.pop()
                    if(lastOperator !== undefined) postfix.push(lastOperator)
                }
                operator.pop()
            }
            else{
                if(operator.length === 0){
                    operator.push(infix[i])
                }
                else{
                    while(operator.length > 0 && hasPriorityOn(operator[operator.length-1], infix[i])){
                        let lastOperator: string | undefined = operator.pop()
                        if(lastOperator !== undefined) postfix.push(lastOperator)
                    }

                    operator.push(infix[i])
                }
            }
        }
    }

    
    while(operator.length > 0){
        let lastOperator: string | undefined = operator.pop()
        if(lastOperator !== undefined) postfix.push(lastOperator)
    }
    
    
    return postfix;
}


//Evaluate a postfix expression and return the result
export const evalPostfix = (postfix: string[]) => {
    let stack: string[] = []

    const trace = () => {
        console.log(stack)
    }

    postfix.map( token => {
        if(isOperand(token)) stack.push(token)
        else if(isOperator(token)){
            let nb1 = stack.pop()
            let nb2 = stack.pop()

            //trace()

            let nm1: number;
            let nm2: number;
            if(nb1 != undefined && nb2 != undefined){
                nm1 = parseFloat(nb1)
                nm2 = parseFloat(nb2)

                //console.log("nm1, nm2", nm1, nm2)
            }
            else throw new Error("Undefined nb1 and/or nb2")

            let result: number = 0;
            if(token === "+") result = nm1 + nm2;
            else if(token === "-") result = nm2 - nm1;
            else if(token === "*") result = nm2 * nm1;
            else if(token === "/") result = nm2 / nm1;
            else if(token === "^") result = Math.pow(nm1, nm2)
            else console.log("ERROR: Unknow operator")        
        
            //console.log("result, ", result)    

            let result_str: string = result.toString()
            stack.push(result_str)
        }
    })

    //console.log("Final: ", stack)
    return stack[0]
}


//Is the character an operand ?
export const isOperand = (c: string) => {
    return !isNaN(+c) || c === "." || c === "pi"
}

//Is the character an operator ?
export const isOperator = (c: string) => {
    let operator = false
    operatorList.map(op => {
        if(c === op.op) operator = true
    })
    return operator
}

//Does op1 have priority on op2 ? 
export const hasPriorityOn = (op1: string, op2: string) => {
    if(op1 === undefined) throw new Error("Op1 undefined")
    if(op2 === undefined) throw new Error("Op2 undefined")

    return operatorList.find(op => op.op === op1).priority > operatorList.find(op => op.op === op2).priority
}
