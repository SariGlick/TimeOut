import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
 // עדכן את הנתיב בהתאם
import { createUser } from '../src/services/userService';
import userReducer from '../src/redux/user/user.slice'
import SignUp from '../src/components/signUp/signUp';

jest.mock('./path/to/api'); // עדכן את הנתיב בהתאם

const store = createStore(userReducer);

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // נקה את כל ה-mocks לפני כל טסט
  });

  test('should handle successful user signup', async () => {
    // Mock the API call
    createUser.mockResolvedValue({
      user: { name: 'Test User', email: 'test@example.com' }
    });

    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByText(/sign up/i));

    // Wait for the success actions
    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      expect(localStorage.getItem('nameUser')).toBe('Test User');
    });
  });

  test('should handle user signup failure', async () => {
    // Mock the API call to fail
    createUser.mockRejectedValue(new Error('Sign up failed'));

    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByText(/sign up/i));

    // Wait for the failure
    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      // Optionally check for error handling here
      // For example, you might want to verify if an error message is displayed
      expect(console.error).toHaveBeenCalledWith('error');
    });
  });
});
