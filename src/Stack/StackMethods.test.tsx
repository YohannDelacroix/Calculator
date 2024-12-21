import { StackProvider, useStackContext } from "../StackContext"
import { useEffect, useState } from "react"
import { fireEvent, getByTestId, render, screen, cleanup, waitFor } from "@testing-library/react"
import * as STACK from "./StackMethods";

describe('TESTING STACK PROVIDER -------------------------------------- ', () => {

    const TestComponent = () => {
        const {operandStack, setOperandStack, operatorStack, setOperatorStack} = useStackContext();

        useEffect(() => {
            STACK.push(operandStack, setOperandStack, ["5"])
            STACK.push(operatorStack, setOperatorStack, ["+"])
        }, [])


        
        // TESTING POP OPERATOR STACK
        const [testPopOperator, setTestPopOperator] = useState(false)
        const popOperator = () => {
            console.log("SIMULATE CLICK")
            let last = STACK.pop(operatorStack, setOperatorStack)
            if(last === '+' && operatorStack.length === 0){
                setTestPopOperator(true)
            }
        }

        // TESTING POP OPERAND STACK
        const [testPopOperand, setTestPopOperand] = useState(false)
        const popOperand = () => {
            console.log("SIMULATE CLICK")
            let last = STACK.pop(operandStack, setOperandStack)
            if(last === '5' && operandStack.length === 0){
                setTestPopOperand(true)
            }
        }


        return(<main>
            {operandStack.length > 0 && <span data-testid="pushOperand"></span>}
            {operatorStack.length > 0 && <span data-testid="pushOperator"></span>}
            {STACK.getLastIn(operandStack) === '5' && <span data-testid="lastInOperand"></span>}
            {STACK.getLastIn(operatorStack) === '+' && <span data-testid="lastInOperator"></span>}

            <button onClick={popOperator} data-testid="btnPopOperator"></button>
            {testPopOperator && <span data-testid="testPopOperator"></span>}

            <button onClick={popOperand} data-testid="btnPopOperand"></button>
            {testPopOperand && <span data-testid="testPopOperand"></span>}
        </main>)
    }

    

    describe('Stack Tests', () => {
        afterEach(() => {
            cleanup();
        })

        const renderStackProvider = () => render(<StackProvider>
            <TestComponent />
        </StackProvider>)

        it('should add a value to operand Stack', () => {
            renderStackProvider()
            expect(screen.getByTestId('pushOperand')).toBeInTheDocument()
        })

        it('should add a value to operator stack', () => {
            renderStackProvider()
            expect(screen.getByTestId('pushOperator')).toBeInTheDocument()
        })

        it('should get the last in operand Stack', () => {
            renderStackProvider()
            expect(screen.getByTestId('lastInOperand')).toBeInTheDocument()
        })

        it('should get the last in operator Stack', () => {
            renderStackProvider()
            expect(screen.getByTestId('lastInOperator')).toBeInTheDocument()
        })

        it('should pop the last in operator Stack and return the value', async () => {
            const { getByTestId } = renderStackProvider()
            fireEvent.click(getByTestId('btnPopOperator'))

            await waitFor(() => {
                expect(getByTestId('testPopOperator')).toBeInTheDocument()
            })
        })

        it('should pop the last in operand Stack and return the value', async () => {
            const { getByTestId } = renderStackProvider()
            fireEvent.click(getByTestId('btnPopOperand'))

            await waitFor(() => {
                expect(getByTestId('testPopOperand')).toBeInTheDocument()
            })
        })

    })

    describe('Stack methods', () => {
        it("should return a valid string format", () => {
            expect(STACK.toString(["4","6","5",".","5"])).toBe("465.5")
            expect(STACK.toString([])).toBe("")
        })

        it("get second from end", () => {
            expect(STACK.getSecondFromEnd(["4","+","9"])).toBe("+")
            expect(STACK.getSecondFromEnd(["5"])).toBe("")
            expect(STACK.getSecondFromEnd([])).toBe("")
        })
    })
})