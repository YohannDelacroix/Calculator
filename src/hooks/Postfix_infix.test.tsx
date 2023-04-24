import { usePostfix, isOperand, isOperator, hasPriorityOn } from "./Postfix_Infix"

describe("Testing infix-postfix methods", () => {
    test("isOperand should return true", () => {
        expect(isOperand("0")).toBeTruthy()
        expect(isOperand("1")).toBeTruthy()
        expect(isOperand("2")).toBeTruthy()
        expect(isOperand("3")).toBeTruthy()
        expect(isOperand("4")).toBeTruthy()
        expect(isOperand("5")).toBeTruthy()
        expect(isOperand("6")).toBeTruthy()
        expect(isOperand("7")).toBeTruthy()
        expect(isOperand("8")).toBeTruthy()
        expect(isOperand("9")).toBeTruthy()
    })

    test("isOperand should return false", () => {
        expect(isOperand("+")).not.toBeTruthy()
        expect(isOperand("-")).not.toBeTruthy()
        expect(isOperand("*")).not.toBeTruthy()
        expect(isOperand("/")).not.toBeTruthy()
    })

    test("isOperator should return true", () => {
        expect(isOperator("+")).toBeTruthy()
        expect(isOperator("-")).toBeTruthy()
        expect(isOperator("*")).toBeTruthy()
        expect(isOperator("/")).toBeTruthy()
    })

    test("isOperator should return false", () => {
        expect(isOperator("3")).not.toBeTruthy()
        expect(isOperator("5")).not.toBeTruthy()
        expect(isOperator("0")).not.toBeTruthy()
        expect(isOperator("8")).not.toBeTruthy()
    })

    test("Priority checks works", () => {
        expect(hasPriorityOn("*", "-")).toBeTruthy()
        expect(hasPriorityOn("+", "-")).not.toBeTruthy()
        expect(hasPriorityOn("+", "/")).not.toBeTruthy()
        expect(hasPriorityOn("^", "*")).toBeTruthy()
        expect(hasPriorityOn("^", "sq")).not.toBeTruthy()
    })


    it("should return a valid postfix", () => {
        let postfix: string[] = usePostfix("5*4+3")
        expect(postfix).toStrictEqual(["5","4","*","3","+"])

        let postfix2: string[] = usePostfix("8*(4*9+3*7)+2")
        expect(postfix2).toStrictEqual(["8", "4", "9","*", "3", "7","*","+","*", "2","+"])

        let postfix3: string[] = usePostfix("(5+4)*(9/8)")
        expect(postfix3).toStrictEqual(["5","4","+","9","8","/","*"])
    })

    
})