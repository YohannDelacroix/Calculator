import { useReducer } from "react"
import { StackReducer, stackActionType } from "./StackReducer"


describe("Testing StackReducer", () => {
    it("should add tokens to the stack on ADD_TO_STACK", () => {
        const initialState = { stack: [] };
        const action = { type: stackActionType.ADD_TO_STACK, tokens: ["1", "2"] };
        const newState = StackReducer(initialState, action);
        expect(newState).toEqual({ stack: ["1", "2"] });
    });

    it("should replace stack by the new stack on REPLACE_STACK", () => {
        const initialState = { stack: ["53"] };
        const action = { type: stackActionType.REPLACE_STACK, tokens: ["534"] };
        const newState = StackReducer(initialState, action);
        expect(newState).toEqual({ stack: ["534"] });
    });

    it("should remove the last token from the stack on REMOVE_FROM_STACK", () => {
        const initialState = { stack: ["1", "2"] };
        const action = { type: stackActionType.REMOVE_FROM_STACK, tokens: ["2"] };
        const newState = StackReducer(initialState, action);
        expect(newState).toEqual({ stack: ["1"] });
    });

    it("should clear the stack on CLEAR", () => {
        const initialState = { stack: ["1", "2", "3"] };
        const action = { type: stackActionType.CLEAR, tokens: [] };
        const newState = StackReducer(initialState, action);
        expect(newState).toEqual({ stack: [] });
    });

    it("should evaluate the stack on EVALUATE", () => {
        const initialState = { stack: ["2", "+", "3"] };
        // Mock functions used in evaluate
        jest.mock("../Calc/CalcUtils", () => ({
            prepareInfixForCalculation: jest.fn(() => ["2", "+", "3"]),
            toPostfix: jest.fn(() => ["2", "3", "+"]),
            evaluatePostfixExpression: jest.fn(() => "5"),
        }));
        const action = { type: stackActionType.EVALUATE, tokens: [] };
        const newState = StackReducer(initialState, action);
        expect(newState).toEqual({ stack: ["5"] });
    });
});