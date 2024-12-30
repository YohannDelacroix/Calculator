import React from "react";
import { render, act } from "@testing-library/react";
import { useCalculator } from "../hooks/useCalculator";
import TestComponent from "./TestComponent";

describe("useCalculator Tests", () => {
    it("should initialize the stack with an empty array", () => {
        let result: any;
        render(<TestComponent onRender={(hook) => (result = hook)} />);
        expect(result.stackState.stack).toEqual([]);
    });

    it("should add an operand to the stack", () => {
        let result: any;
        render(<TestComponent onRender={(hook) => (result = hook)} />);

        act(() => {
          result.pushToStack("5");
        });

        expect(result.stackState.stack).toEqual(["5"]);
    });

    it("should concatenate a new operand with the last one in the stack", () => {
        let result: any;
        render(<TestComponent onRender={(hook) => (result = hook)} />);

        act(() => {
            result.pushToStack("5");
        });

        act(() => {
            result.pushToStack("3");
        });

        expect(result.stackState.stack).toEqual(["53"]);
    });

    it("should concatenate a new operand with the last one in the stack and handle an operator", () => {
        let result: any;
        render(<TestComponent onRender={(hook) => (result = hook)} />);

        act(() => {
            result.pushToStack("5");
        });

        act(() => {
            result.pushToStack("3");
        });

        act(() => {
            result.pushToStack("+");
        });

        expect(result.stackState.stack).toEqual(["53", "+"]);
    });
});