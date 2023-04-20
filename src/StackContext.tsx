import { SetStateAction, createContext, useContext, useState, Dispatch, useEffect } from "react";


export type StackContent = {
    operatorStack: string[];
    setOperatorStack: Dispatch<SetStateAction<string[]>>
    operandStack: string[];
    setOperandStack: Dispatch<SetStateAction<string[]>>
}


export const StackContext = createContext<StackContent>({
    operatorStack: [],
    setOperatorStack: () => {},
    operandStack: [],
    setOperandStack: () => {}
})


export const StackProvider = ({children}: any) => {
    const [operatorStack, setOperatorStack] = useState<string[]>([])
    const [operandStack, setOperandStack] = useState<string[]>([])

    useEffect( () => {
        console.log("OPERATOR ", operatorStack)
        console.log("OPERAND", operandStack)
    }, [operandStack, operatorStack])

    return(
        <StackContext.Provider value={{operatorStack, setOperatorStack, operandStack, setOperandStack}}>
            {children}
        </StackContext.Provider>
    )
}


export const useStackContext = () => useContext(StackContext)
export default StackContext;