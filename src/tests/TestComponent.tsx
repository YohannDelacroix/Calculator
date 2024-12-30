import React from "react";
import { render, act } from "@testing-library/react";
import { useCalculator } from "../hooks/useCalculator";

//TestComponent used to render the useCalculator hook in order to testing it
const TestComponent = ({ onRender }: { onRender: (result: any) => void }) => {
    const hook = useCalculator();
    onRender(hook);
    return null;
};

export default TestComponent;