// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import SimplePopup from '../../../src/stories/popup/popup';

// test('renders the SimplePopup component and toggles the popup', () => {
//   const customMessage = 'Hello, this is a custom message!';
//   const mockOnClick = jest.fn();

//   render(<SimplePopup message={customMessage} buttonInThePopup="Close" onClick={mockOnClick} />);

  
//   const toggleButton = screen.getByText(/toggle popup/i);
//   expect(toggleButton).toBeInTheDocument();

  
//   fireEvent.click(toggleButton);
//   expect(screen.getByText(customMessage)).toBeInTheDocument();

  
//   const buttonInPopup = screen.getByText(/close/i);
//   fireEvent.click(buttonInPopup);
//   expect(mockOnClick).toHaveBeenCalledTimes(1)
// });
