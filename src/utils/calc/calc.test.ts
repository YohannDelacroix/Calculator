import exp from "constants"
import { toPostfix, isOperand, isFunction, isOperator, hasPriorityOn, evaluatePostfixExpression, isValidInfixExpression, prepareInfixForCalculation, isOperatorAMinus } from "./calcUtils"
import { textSpanContainsPosition } from "typescript"

describe("Testing infix-postfix methods", () => {
    //Constants
    const SQUARE_ROOT = "\u221a";
    const PI = "\u03c0";

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
        expect(isOperand(".")).toBeTruthy()
        expect(isOperand(PI)).not.toBeTruthy()
    })

    test("isOperand should return false", () => {
        expect(isOperand("+")).not.toBeTruthy()
        expect(isOperand("-")).not.toBeTruthy()
        expect(isOperand("*")).not.toBeTruthy()
        expect(isOperand("/")).not.toBeTruthy()
        expect(isOperand("^")).not.toBeTruthy()
    })

    test("isOperator should return true", () => {
        expect(isOperator("+")).toBeTruthy()
        expect(isOperator("-")).toBeTruthy()
        expect(isOperator("*")).toBeTruthy()
        expect(isOperator("/")).toBeTruthy()
        expect(isOperator("%")).toBeTruthy()
        expect(isOperator(SQUARE_ROOT)).toBeTruthy()
    })

    test("isOperator should return false", () => {
        expect(isOperator("3")).not.toBeTruthy()
        expect(isOperator("5")).not.toBeTruthy()
        expect(isOperator("0")).not.toBeTruthy()
        expect(isOperator("8")).not.toBeTruthy()
    })

    test("isOperatorAMinus should return true", () => {
        let minus: string = "-";
        expect(isOperatorAMinus(minus)).toBeTruthy();
    })

    test("isOperatorAMinus should return false", () => {
        let token: string = "+";
        expect(isOperatorAMinus(token)).not.toBeTruthy();
    })

    test("isFunction should return true", () => {
        expect(isFunction(SQUARE_ROOT)).toBeTruthy()
        expect(isFunction(PI)).toBeTruthy()
    })

    test("isFunction should return false", () => {
        expect(isFunction("7")).not.toBeTruthy()
        expect(isFunction("+")).not.toBeTruthy()

    })

    test("Priority checks works", () => {
        expect(hasPriorityOn("*", "-")).toBeTruthy()
        expect(hasPriorityOn("+", "-")).not.toBeTruthy()
        expect(hasPriorityOn("+", "/")).not.toBeTruthy()
        expect(hasPriorityOn("^", "*")).toBeTruthy()
        expect(hasPriorityOn("^", SQUARE_ROOT)).not.toBeTruthy()
    })


    it("should return a valid postfix", () => {
        let postfix: string[] = toPostfix(["53","*","4.7","+","3"])
        expect(postfix).toStrictEqual(["53","4.7","*","3","+"])

        let postfix2: string[] = toPostfix(["8","*","(","4","*","9","+","3","*","7",")","+","2"])
        expect(postfix2).toStrictEqual(["8", "4", "9","*", "3", "7","*","+","*", "2","+"])

        let postfix3: string[] = toPostfix(["(","5","+","4",")","*","(","9","/","8",")"])
        expect(postfix3).toStrictEqual(["5","4","+","9","8","/","*"])

        let postfix4: string[] = toPostfix(["-4","*","(", "-6", "+", "3",")"])
        expect(postfix4).toStrictEqual(["-4","-6","3","+","*"])

        let postfix5: string[] = toPostfix(["3","*",SQUARE_ROOT,"(","4","+","5",")"])
        expect(postfix5).toStrictEqual(["3","4","5","+",SQUARE_ROOT,"*"])

        let postfix6: string[] = toPostfix([SQUARE_ROOT,"9"])
        expect(postfix6).toStrictEqual(["9",SQUARE_ROOT])

        let postfix7: string[] = toPostfix([SQUARE_ROOT,"(","9","+", "7",")"])
        expect(postfix7).toStrictEqual(["9","7","+",SQUARE_ROOT])
    })

    it("should evaluate a postfix expression", () => {
        let postfix: string[] = ["5","4","*","3","+"]
        expect(evaluatePostfixExpression(postfix)).toBe("23")

        let postfix2: string[] = ["5","5","+","10","6","-","/"]
        expect(evaluatePostfixExpression(postfix2)).toBe("2.5")

        let postfix4: string[] = ["-4","-6","3","+","*"]
        expect(evaluatePostfixExpression(postfix4)).toBe("12")

        let postfix5: string[] = ["3","4","5","+",SQUARE_ROOT,"*"]
        expect(evaluatePostfixExpression(postfix5)).toBe("9")

        let postfix6: string[] = ["9", SQUARE_ROOT]
        expect(evaluatePostfixExpression(postfix6)).toBe("3")

        let postfix7: string[] = ["9","7","+",SQUARE_ROOT]
        expect(evaluatePostfixExpression(postfix7)).toBe("4")
    })

    it("should make a prescan and return a valid expresion", () => {
        //Case of no * typed
        let expresion4: string[] = ["8", SQUARE_ROOT,"3"]
        expect(prepareInfixForCalculation(expresion4)).toStrictEqual(["8", "*",SQUARE_ROOT,"3"])

        let expresion4b: string[] = ["8", "(","3","+","7",")"]
        expect(prepareInfixForCalculation(expresion4b)).toStrictEqual(["8", "*", "(","3","+","7",")"])

        let expresion4c: string[] = ["(","3","+","7",")","(","3","+","7",")"]
        expect(prepareInfixForCalculation(expresion4c)).toStrictEqual(["(","3","+","7",")", "*", "(","3","+","7",")"])

        //Case of no * typed opposite
        let expresion8: string[] = ["(","6","+","9",")","7"]
        expect(prepareInfixForCalculation(expresion8)).toStrictEqual(["(","6","+","9",")","*","7"])


        //Case of - before functions or parenthesis
        let expresion: string[] = ["-","(","5","+","9",")"]
        expect(prepareInfixForCalculation(expresion)).toStrictEqual(["-1","*", "(","5","+","9",")"])

        let expresion2: string[] = ["-",SQUARE_ROOT,"9"]
        expect(prepareInfixForCalculation(expresion2)).toStrictEqual(["-1","*",SQUARE_ROOT,"9"])

        let expresion3: string[] = ["5", "*", "-",SQUARE_ROOT,"9"]
        expect(prepareInfixForCalculation(expresion3)).toStrictEqual(["5", "*", "-1", "*",SQUARE_ROOT,"9"])


        //Case with - after operators
        let expresion5: string[] = ["8", "-","-","3"]
        expect(prepareInfixForCalculation(expresion5)).toStrictEqual(["8", "-","-1","*","3"])

        let expresion6: string[] = ["-","3"]
        expect(prepareInfixForCalculation(expresion6)).toStrictEqual(["-1","*","3"])

        //case of pi
        let expresion7: string[] = ["9", PI]
        expect(prepareInfixForCalculation(expresion7)).toStrictEqual(["9","*", Math.PI.toString()])

        let expresion7b: string[] = [PI,"(",PI,"^","2",")"]
        expect(prepareInfixForCalculation(expresion7b)).toStrictEqual([Math.PI.toString(),"*","(",Math.PI.toString(),"^","2",")"])

    })

    describe("should reject an invalid expression", () => {
        it("should reject when expression ends with an operator", () => {
            let infix1: string[] = ["5","+","4","+"];
            expect(() => isValidInfixExpression(infix1)).toThrow();
        })
        it("should reject when expression starts with an operator", () => {
            expect(() => isValidInfixExpression( ["*","5","+","3"] )).toThrow();
        })
        it("should reject when miss a parenthese on end", () => {
            expect(() => isValidInfixExpression(["(", "(", "5","+","3",")"])).toThrow();
        })
        it("should reject when the user types on error message", () => {
            expect(() => isValidInfixExpression(["ERROR","5", "6"])).toThrow()
        })
        it("should reject when three consecutives minus operators are typed", () => {
            expect(() => isValidInfixExpression(["9","-","-","-","9"])).toThrow()
        })
        it("should reject when a decimal token follows a PI symbol", () => {
            expect(() => isValidInfixExpression([PI,".","3"])).toThrow()
        })
    })

    it("should accept a valid expression", () => {
        expect(isValidInfixExpression(["53","*","4.7","+","3"])).toBeTruthy()
        expect(isValidInfixExpression(["8","*","(","4","*","9","+","3","*","7",")","+","2"])).toBeTruthy()
        expect(isValidInfixExpression(["(","5","+","4",")","*","(","9","/","8",")"])).toBeTruthy()
        expect(isValidInfixExpression(["-", "(","5","+","4",")","*", "-", "(","9","/","8",")"])).toBeTruthy()
        expect(isValidInfixExpression(["3","*",SQUARE_ROOT,"(","4","+","5",")"])).toBeTruthy()
        expect(isValidInfixExpression([SQUARE_ROOT,"9"])).toBeTruthy()
    })
})