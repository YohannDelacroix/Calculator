import { render, screen, fireEvent } from '@testing-library/react';
import Screen from './Screen';

test("should print the correct value on screen", () => {
    render(<Screen calculatorStack={["3","4"]} />)
    expect(screen.getByText("34")).toBeInTheDocument()
});