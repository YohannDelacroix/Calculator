import { useEffect, useState } from "react"
import * as StackUtils from "./StackUtils";

describe('TESTING STACK UTILS -------------------------------------- ', () => {
    describe('Stack methods', () => {
        test("pushValuesToStack should add values to the stack", () => {
            const setStack = jest.fn();
            const stack = ["1"];
            const value = ["2", "3"]
            StackUtils.pushValuesToStack(stack, setStack, value);
            expect(setStack).toHaveBeenCalledWith(["1", "2", "3"]);
        })

        test("getSecondValueFromEnd retrieves the second last value", () => {
            expect(StackUtils.getSecondValueFromEnd(["4","+","9"])).toBe("+")
            expect(StackUtils.getSecondValueFromEnd(["5"])).toBe("")
            expect(StackUtils.getSecondValueFromEnd([])).toBe("")
        })

        test("getLastIn retrieves the last value", () => {
            expect(StackUtils.getLastIn(["1", "2", "3"])).toBe("3");
            expect(StackUtils.getLastIn([])).toBe("");
        });

        test("popValueFromStack removes the last value", () => {
            const setStack = jest.fn();
            const stack = ["1", "2", "3"];
            expect(StackUtils.popValueFromStack(stack, setStack)).toBe("3");
            expect(setStack).toHaveBeenCalledWith(["1", "2"]);
        });

        test("emptyStack empties the stack", () => {
            const setStack = jest.fn();
            StackUtils.emptyStack(["1", "2", "3"], setStack);
            expect(setStack).toHaveBeenCalledWith([]);
        });
    
        test("toString should return a valid string format", () => {
            expect(StackUtils.toString(["4","6","5",".","5"])).toBe("465.5")
            expect(StackUtils.toString([])).toBe("")
        })

    })
})