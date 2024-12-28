import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('updates screen when buttons are clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('button-1'));
  fireEvent.click(screen.getByTestId('button-+'));
  fireEvent.click(screen.getByTestId('button-2'));
  expect(screen.getByTestId('screen')).toHaveTextContent('1+2');
});