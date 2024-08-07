import { render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(() => {
  cleanup(); // Ensures all components are unmounted and cleaned up
});

test('renders App component', () => {
  render(<App />);
});
