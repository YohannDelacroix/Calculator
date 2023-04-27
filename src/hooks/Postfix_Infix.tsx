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



//convert a infix expression into postfix
export const toPostfix = (infix: string[]): string[] => {
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

            trace()

            let nm1: number;
            let nm2: number;
            if(nb1 != undefined && nb2 != undefined){
                nm1 = parseInt(nb1)
                nm2 = parseInt(nb2)

                console.log("nm1, nm2", nm1, nm2)
            }
            else throw new Error("Undefined nb1 and/or nb2")

            let result: number = 0;
            if(token === "+") result = nm1 + nm2;
            else if(token === "-") result = nm2 - nm1;
            else if(token === "*") result = nm2 * nm1;
            else if(token === "/") result = nm2 / nm1;
            else if(token === "^") result = Math.pow(nm1, nm2)
            else console.log("ERROR: Unknow operator")        
        
            console.log("result, ", result)    

            let result_str: string = result.toString()
            stack.push(result_str)
        }
    })

    console.log("Final: ", stack)
    return stack[0]
}


//Is the character an operand ?
export const isOperand = (c: string) => {
    return !isNaN(+c)
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
