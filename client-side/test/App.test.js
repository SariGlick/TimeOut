import { render, cleanup } from '@testing-library/react';
import App from '../src/App';

afterEach(() => {
  cleanup(); // Ensures all components are unmounted and cleaned up
});

test('renders App component', () => {
  render(<App />);
});
