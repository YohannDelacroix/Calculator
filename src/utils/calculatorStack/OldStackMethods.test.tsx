import { StackProvider, useStackContext } from "../../OldStackContext"
import { useEffect, useState } from "react"
import { fireEvent, getByTestId, render, screen, cleanup, waitFor } from "@testing-library/react"
import * as StackUtils from "./StackUtils";

/*
describe('OLD FRONTEND TESTING WITH STACK PROVIDER-------------------------------------- ', () => {
    const TestComponent = () => {
        const {operandStack, setOperandStack, operatorStack, setOperatorStack} = useStackContext();

        useEffect(() => {
            StackUtils.pushValuesToStack(operandStack, setOperandStack, ["5"])
            StackUtils.pushValuesToStack(operatorStack, setOperatorStack, ["+"])
        }, [])

        // TESTING POP OPERATOR STACK
        const [testPopOperator, setTestPopOperator] = useState(false)
        const popOperator = () => {
            let last = StackUtils.popValueFromStack(operatorStack, setOperatorStack)
            if(last === '+' && operatorStack.length === 0){
                setTestPopOperator(true)
            }
        }

        // TESTING POP OPERAND STACK
        const [testPopOperand, setTestPopOperand] = useState(false)
        const popOperand = () => {
            let last = StackUtils.popValueFromStack(operandStack, setOperandStack)
            if(last === '5' && operandStack.length === 0){
                setTestPopOperand(true)
            }
        }


        return(<main>
            {operandStack.length > 0 && <span data-testid="pushOperand"></span>}
            {operatorStack.length > 0 && <span data-testid="pushOperator"></span>}
            {StackUtils.getLastIn(operandStack) === '5' && <span data-testid="lastInOperand"></span>}
            {StackUtils.getLastIn(operatorStack) === '+' && <span data-testid="lastInOperator"></span>}

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
            expect(StackUtils.toString(["4","6","5",".","5"])).toBe("465.5")
            expect(StackUtils.toString([])).toBe("")
        })

        it("get second from end", () => {
            expect(StackUtils.getSecondValueFromEnd(["4","+","9"])).toBe("+")
            expect(StackUtils.getSecondValueFromEnd(["5"])).toBe("")
            expect(StackUtils.getSecondValueFromEnd([])).toBe("")
        })
    })
}) */