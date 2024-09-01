import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GLogin1 from './GLogin1';
import { getUserByGoogleAccount } from '../../src/components/Login/GoogleLogin';
import { jwtDecode } from 'jwt-decode';

// Mocking GoogleOAuthProvider
jest.mock('@react-oauth/google', () => ({
  GoogleLogin: jest.fn(({ onSuccess, onError }) => (
    <button
      onClick={() => onSuccess({ credential: 'mockToken' })}
    >
      Mock Google Login
    </button>
  )),
  googleLogout: jest.fn(),
}));

// Mocking the API call
jest.mock('../../services/login-services', () => ({
  getUserByGoogleAccount: jest.fn(() => Promise.resolve({ email: 'test@example.com' })),
}));

// Mocking jwtDecode
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(() => ({ email: 'test@example.com' })),
}));

describe('GLogin1 Component', () => {
  test('renders Google login button', () => {
    render(
      <GoogleOAuthProvider clientId="test-client-id">
        <GLogin1 />
      </GoogleOAuthProvider>
    );
    expect(screen.getByText('Mock Google Login')).toBeInTheDocument();
  });

  test('handles login success', async () => {
    render(
      <GoogleOAuthProvider clientId="test-client-id">
        <GLogin1 />
      </GoogleOAuthProvider>
    );
    fireEvent.click(screen.getByText('Mock Google Login'));
    await waitFor(() => {
      expect(screen.queryByText('Mock Google Login')).not.toBeInTheDocument();
      expect(screen.getByText('Log Out')).toBeInTheDocument();
    });
  });

  test('handles login failure', async () => {
    // Adjust the mock to simulate an error
    getUserByGoogleAccount.mockRejectedValueOnce(new Error('Server Error'));
    
    render(
      <GoogleOAuthProvider clientId="test-client-id">
        <GLogin1 />
      </GoogleOAuthProvider>
    );
    fireEvent.click(screen.getByText('Mock Google Login'));
    await waitFor(() => {
      expect(screen.getByText('Login Failed')).toBeInTheDocument();
    });
  });

  test('logs out successfully', async () => {
    render(
      <GoogleOAuthProvider clientId="test-client-id">
        <GLogin1 />
      </GoogleOAuthProvider>
    );
    fireEvent.click(screen.getByText('Mock Google Login'));
    await waitFor(() => {
      expect(screen.getByText('Log Out')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Log Out'));
    await waitFor(() => {
      expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
      expect(screen.getByText('Mock Google Login')).toBeInTheDocument();
    });
  });
});
