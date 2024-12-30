import { useEffect, useState } from "react"
import * as StackUtils from "./StackUtils";

describe('TESTING STACK UTILS -------------------------------------- ', () => {
    describe('Stack methods', () => {
        test("getSecondValueFromEnd retrieves the second last value", () => {
            expect(StackUtils.getSecondValueFromEnd(["4","+","9"])).toBe("+")
            expect(StackUtils.getSecondValueFromEnd(["5"])).toBe("")
            expect(StackUtils.getSecondValueFromEnd([])).toBe("")
        })

        test("getLastIn retrieves the last value", () => {
            expect(StackUtils.getLastIn(["1", "2", "3"])).toBe("3");
            expect(StackUtils.getLastIn([])).toBe("");
        });
    
        test("toString should return a valid string format", () => {
            expect(StackUtils.toString(["4","6","5",".","5"])).toBe("465.5")
            expect(StackUtils.toString([])).toBe("")
        })

    })
})