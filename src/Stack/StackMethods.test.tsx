import { StackProvider, useStackContext } from "../OldStackContext"
import { useEffect, useState } from "react"
import { fireEvent, getByTestId, render, screen, cleanup, waitFor } from "@testing-library/react"
import * as StackUtils from "./StackUtils";

describe('TESTING STACK UTILS -------------------------------------- ', () => {
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
})