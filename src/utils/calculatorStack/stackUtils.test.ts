import { useEffect, useState } from "react"
import * as stackUtils from "./stackUtils";

describe('TESTING STACK UTILS -------------------------------------- ', () => {
    describe('Stack methods', () => {
        test("getLastIn retrieves the last value", () => {
            expect(stackUtils.getLastIn(["1", "2", "3"])).toBe("3");
            expect(stackUtils.getLastIn([])).toBe("");
        });
    
        test("toString should return a valid string format", () => {
            expect(stackUtils.toString(["4","6","5",".","5"])).toBe("465.5")
            expect(stackUtils.toString([])).toBe("")
        })

    })
})