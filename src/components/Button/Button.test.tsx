import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  render(<Button buttonValue="1" onButtonClick={() => {}} />);
  expect(screen.getByText('1')).toBeInTheDocument();
});

test('calls onButtonClick when button is clicked', () => {
  const handleClick = jest.fn();
  render(<Button buttonValue="1" onButtonClick={handleClick} />);
  fireEvent.click(screen.getByText('1'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});