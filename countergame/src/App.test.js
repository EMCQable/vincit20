import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders instruction paragraph', () => {
  const { getByText } = render(<App />);
  const InstructionElement = getByText(/Push the button/i);
  expect(InstructionElement).toBeInTheDocument();
});
