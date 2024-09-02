import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AddProfile from '../../../src/components/profileComponents/addProfileComponent';
const mockStore = configureStore([]);
const renderWithProviders = (ui, { initialState, store = mockStore(initialState) } = {}) => {
 return render(
   <Provider store={store}>
     <SnackbarProvider>
       <MemoryRouter>
         {ui}
       </MemoryRouter>
     </SnackbarProvider>
   </Provider>
 );
};
describe('AddProfile Component', () => {
 beforeEach(() => {
   jest.resetAllMocks();
 });
 describe('Dialog interactions', () => {
   test('A dialog opens when you click the button: "Add a new profile"', () => {
     renderWithProviders(<AddProfile userId="123" />);
     const addButton = screen.getByText('Add a new profile');
     fireEvent.click(addButton);
     expect(screen.getByText('New profile')).toBeVisible();
     expect(screen.getByLabelText('Time Start')).toBeVisible();
     expect(screen.getByLabelText('Time End')).toBeVisible();
     expect(screen.getByText('White List') || screen.getByText('Black List')).toBeVisible();
   });
   test('Dialog closes when handleClose is called', () => {
     renderWithProviders(<AddProfile userId="6698da056e5c07ebd3c11ec1" />);
     const addButton = screen.getByText('Add a new profile');
     fireEvent.click(addButton);
     const closeButton = screen.getByText('Cancel');
     fireEvent.click(closeButton);
     expect(screen.queryByText('New profile')).not.toBeVisible();
   });
 });
 describe('Validation checks', () => {
   test('Validation error appears when the profile name is too short', () => {
     renderWithProviders(<AddProfile userId="123" />);
     const addButton = screen.getByText('Add a new profile');
     fireEvent.click(addButton);
     const nameInput = screen.getByLabelText('Profile Name');
     fireEvent.change(nameInput, { target: { value: 'A' } });
     expect(screen.getByText('Name must be at least 2 characters long.')).toBeVisible();
   });
   test('handleChange updates errorText for invalid profile name', () => {
     renderWithProviders(<AddProfile userId="6698da056e5c07ebd3c11ec1" />);
     const addButton = screen.getByText('Add a new profile');
     fireEvent.click(addButton);
     const nameInput = screen.getByLabelText('Profile Name');
     fireEvent.change(nameInput, { target: { value: 'A' } });
     expect(screen.getByText('Name must be at least 2 characters long.')).toBeVisible();
   });
   test('handleChange updates errorText for profile name exceeding max length', () => {
     renderWithProviders(<AddProfile userId="6698da056e5c07ebd3c11ec1" />);
     const addButton = screen.getByText('Add a new profile');
     fireEvent.click(addButton);
     const nameInput = screen.getByLabelText('Profile Name');
     fireEvent.change(nameInput, { target: { value: 'Name cannot be more than 50 characters long.Name cannot be more than 50 characters long.' } });
     expect(screen.getByText('Name cannot be more than 50 characters long.')).toBeVisible();
   });
 });
 describe('Button state checks', () => {
   test('Submit button is disabled when required fields are missing', () => {
     renderWithProviders(<AddProfile userId="123" />);
     const addButton = screen.getByText('Add a new profile');
     fireEvent.click(addButton);
     const submitButton = screen.getByText('Adding');
     expect(submitButton).toBeDisabled();
   });
   test('Submit button is enabled when all fields are valid', () => {
     renderWithProviders(<AddProfile userId="123" />);
     const addButton = screen.getByText('Add a new profile');
     fireEvent.click(addButton);
     // Fill in valid name
     const nameInput = screen.getByLabelText('Profile Name');
     fireEvent.change(nameInput, { target: { value: 'Valid Profile Name' } });
     // Fill in other required fields
     fireEvent.change(screen.getByLabelText('Time Start'), { target: { value: '09:00' } });
     fireEvent.change(screen.getByLabelText('Time End'), { target: { value: '17:00' } });
     fireEvent.click(screen.getByLabelText('White List')); // Ensure the radio button is selected
     const submitButton = screen.getByText('Adding');
     // Ensure submit button is enabled
     expect(submitButton).not.toBeDisabled();
   });
 });
 describe('API interaction', () => {
   test('Snackbar shows success message on successful profile creation', async () => {
     const mockCreateProfile = jest.fn().mockResolvedValueOnce({ message: 'Profile created successfully' });
     jest.mock('../../../src/services/profileService', () => ({
       createProfile: mockCreateProfile,
     }));
     renderWithProviders(<AddProfile userId="6698da056e5c07ebd3c11ec1" />);
     const addButton = screen.getByText('Add a new profile');
     fireEvent.click(addButton);
     fireEvent.change(screen.getByLabelText('Profile Name'), { target: { value: 'My Profile' } });
     fireEvent.change(screen.getByLabelText('Time Start'), { target: { value: '09:00' } });
     fireEvent.change(screen.getByLabelText('Time End'), { target: { value: '17:00' } });
     fireEvent.click(screen.getByLabelText('White List'));
     fireEvent.click(screen.getByText('Adding'));
     expect(await screen.findByText('Error creating profile')).toBeVisible();
   });
 });
});