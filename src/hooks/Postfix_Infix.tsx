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


export const usePostfix = (infix: string) => {
    let postfix: string[] = [];
    let operator: string[] = [];

    const trace = () => {
        console.log("Postfix : ", postfix)
        console.log("Operator ", operator)
    }

    for(let i = 0; i < infix.length; i++){
        if(isOperand(infix[i])){
            postfix.push(infix[i])
            trace();
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
                console.log("Ok")
                if(operator.length === 0){
                    operator.push(infix[i])
                    trace()
                }
                else{
                    while(operator.length > 0 && hasPriorityOn(operator[operator.length-1], infix[i])){
                        let lastOperator: string | undefined = operator.pop()
                        if(lastOperator !== undefined) postfix.push(lastOperator)
                    }

                    operator.push(infix[i])
                    trace()
                }
            }
        }
    }

    
    while(operator.length > 0){
        let lastOperator: string | undefined = operator.pop()
        if(lastOperator !== undefined) postfix.push(lastOperator)
        trace()
    }
    
    
    return postfix;
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
