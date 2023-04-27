import { SetStateAction, createContext, useContext, useState, Dispatch, useEffect } from "react";


export type StackContent = {
    operatorStack: string[];
    setOperatorStack: Dispatch<SetStateAction<string[]>>
    operandStack: string[];
    setOperandStack: Dispatch<SetStateAction<string[]>>

    stack: string[];
    setStack: Dispatch<SetStateAction<string[]>>
}


export const StackContext = createContext<StackContent>({
    operatorStack: [],
    setOperatorStack: () => {},
    operandStack: [],
    setOperandStack: () => {},
    stack: [],
    setStack: () => {}
})


export const StackProvider = ({children}: any) => {
    const [operatorStack, setOperatorStack] = useState<string[]>([])
    const [operandStack, setOperandStack] = useState<string[]>([])
    const [stack, setStack] = useState<string[]>([])


    useEffect( () => {
        console.log("STACK : ", stack)
        console.log("OPRD stack", operandStack)
    }, [stack, operandStack])

    return(
        <StackContext.Provider value={{operatorStack, setOperatorStack, operandStack, setOperandStack, stack, setStack}}>
            {children}
        </StackContext.Provider>
    )
}


export const useStackContext = () => useContext(StackContext)
export default StackContext;