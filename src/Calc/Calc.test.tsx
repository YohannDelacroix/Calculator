import exp from "constants"
import { toPostfix, isOperand, isFunction, isOperator, hasPriorityOn, evalPostfix, isValidInfixExp, preScan } from "./Calc"
import { textSpanContainsPosition } from "typescript"

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
        expect(isOperand(".")).toBeTruthy()
        expect(isOperand("\u03c0")).not.toBeTruthy()
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
        expect(isOperator("\u221a")).toBeTruthy()
    })

    test("isOperator should return false", () => {
        expect(isOperator("3")).not.toBeTruthy()
        expect(isOperator("5")).not.toBeTruthy()
        expect(isOperator("0")).not.toBeTruthy()
        expect(isOperator("8")).not.toBeTruthy()
    })

    test("isFunction should return true", () => {
        expect(isFunction("\u221a")).toBeTruthy()
        expect(isFunction("\u03c0")).toBeTruthy()
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
        expect(hasPriorityOn("^", "\u221a")).not.toBeTruthy()
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

        let postfix5: string[] = toPostfix(["3","*","\u221a","(","4","+","5",")"])
        expect(postfix5).toStrictEqual(["3","4","5","+","\u221a","*"])

        let postfix6: string[] = toPostfix(["\u221a","9"])
        expect(postfix6).toStrictEqual(["9","\u221a"])

        let postfix7: string[] = toPostfix(["\u221a","(","9","+", "7",")"])
        expect(postfix7).toStrictEqual(["9","7","+","\u221a"])
    })

    it("should evaluate a postfix expression", () => {
        let postfix: string[] = ["5","4","*","3","+"]
        expect(evalPostfix(postfix)).toBe("23")

        let postfix2: string[] = ["5","5","+","10","6","-","/"]
        expect(evalPostfix(postfix2)).toBe("2.5")

        let postfix4: string[] = ["-4","-6","3","+","*"]
        expect(evalPostfix(postfix4)).toBe("12")

        let postfix5: string[] = ["3","4","5","+","\u221a","*"]
        expect(evalPostfix(postfix5)).toBe("9")

        let postfix6: string[] = ["9", "\u221a"]
        expect(evalPostfix(postfix6)).toBe("3")

        let postfix7: string[] = ["9","7","+","\u221a"]
        expect(evalPostfix(postfix7)).toBe("4")
    })

    it("should make a prescan and return a valid expresion", () => {
        //Case of no * typed
        let expresion4: string[] = ["8", "\u221a","3"]
        expect(preScan(expresion4)).toStrictEqual(["8", "*","\u221a","3"])

        let expresion4b: string[] = ["8", "(","3","+","7",")"]
        expect(preScan(expresion4b)).toStrictEqual(["8", "*", "(","3","+","7",")"])

        let expresion4c: string[] = ["(","3","+","7",")","(","3","+","7",")"]
        expect(preScan(expresion4c)).toStrictEqual(["(","3","+","7",")", "*", "(","3","+","7",")"])


        //Case of - before functions or parenthesis
        let expresion: string[] = ["-","(","5","+","9",")"]
        expect(preScan(expresion)).toStrictEqual(["-1","*", "(","5","+","9",")"])

        let expresion2: string[] = ["-","\u221a","9"]
        expect(preScan(expresion2)).toStrictEqual(["-1","*","\u221a","9"])

        let expresion3: string[] = ["5", "*", "-","\u221a","9"]
        expect(preScan(expresion3)).toStrictEqual(["5", "*", "-1", "*","\u221a","9"])


        //Case with - after operators
        let expresion5: string[] = ["8", "-","-","3"]
        expect(preScan(expresion5)).toStrictEqual(["8", "-","-1","*","3"])

        let expresion6: string[] = ["-","3"]
        expect(preScan(expresion6)).toStrictEqual(["-1","*","3"])

        //case of pi
        let expresion7: string[] = ["9", "\u03c0"]
        expect(preScan(expresion7)).toStrictEqual(["9","*", Math.PI.toString()])

    })

    it("should reject an invalid expression", () => {
        let infix1: string[] = ["5","+","4","+"]
        expect(isValidInfixExp(infix1)).toBeFalsy()
        expect(isValidInfixExp( ["*","5","+","3"] )).toBeFalsy()
        expect(isValidInfixExp(["(", "(", "5","+","3",")"])).toBeFalsy()
        expect(isValidInfixExp(["ERROR56"])).toBeFalsy()
    })

    it("should accept a valid expression", () => {
        
        expect(isValidInfixExp(["53","*","4.7","+","3"])).toBeTruthy()
        expect(isValidInfixExp(["8","*","(","4","*","9","+","3","*","7",")","+","2"])).toBeTruthy()
        expect(isValidInfixExp(["(","5","+","4",")","*","(","9","/","8",")"])).toBeTruthy()
        expect(isValidInfixExp(["-", "(","5","+","4",")","*", "-", "(","9","/","8",")"])).toBeTruthy()
        expect(isValidInfixExp(["3","*","\u221a","(","4","+","5",")"])).toBeTruthy()
        expect(isValidInfixExp(["\u221a","9"])).toBeTruthy()
    })
    
})