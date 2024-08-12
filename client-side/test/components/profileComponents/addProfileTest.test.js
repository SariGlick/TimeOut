import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AddProfile from '../../../src/components/profileComponents/addProfileComponent';

const renderWithProvider = (ui, { initialState, store = createStore(rootReducer, initialState) } = {}) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

const mockStore = configureStore([]);

test('A dialog opens when you click the button: "Add a new profile"', () => {
  const store = mockStore({});
  
  render(
    <Provider store={store}>
      <SnackbarProvider>
        <MemoryRouter>
          <AddProfile userId="123" />
        </MemoryRouter>
      </SnackbarProvider>
    </Provider>
  );

  const addButton = screen.getByText('Add a new profile');
  fireEvent.click(addButton);
  expect(screen.getByText('New profile')).toBeVisible();
});
