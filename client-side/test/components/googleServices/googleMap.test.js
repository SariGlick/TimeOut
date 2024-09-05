import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapComponent from '../../../src/components/googleServices/googleMap.jsx';
import { useSnackbar } from 'notistack';

jest.mock('notistack', () => ({
  useSnackbar: jest.fn(),
}));

jest.mock('@react-google-maps/api', () => ({
  useLoadScript: jest.fn().mockReturnValue({
    isLoaded: true,
    loadError: null,
  }),
  GoogleMap: (props) => <div data-testid="mock-google-map">{props.children}</div>,
  Marker: () => <div data-testid="mock-marker">Marker</div>,
}));

beforeAll(() => {
  global.window.google = {
    maps: {
      places: {
        Autocomplete: jest.fn().mockImplementation(() => ({
          addListener: jest.fn(),
        })),
      },
    },
  };
});

describe('MapComponent', () => {
  const enqueueSnackbar = jest.fn();

  beforeEach(() => {
    useSnackbar.mockReturnValue({ enqueueSnackbar });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should save the selected location', async () => {
    const onSaveData = jest.fn();
    render(<MapComponent onSaveData={onSaveData} />);

    const openMapButton = await screen.findByTestId('open-map-button');
    fireEvent.click(openMapButton);

    const map = await screen.findByTestId('mock-google-map');
    fireEvent.click(map);

    const addressInput = await screen.findByPlaceholderText('Enter address');
    fireEvent.change(addressInput, { target: { value: 'Some Address' } });
  
    expect(addressInput.value).toBe('Some Address');
  
    const saveButton = await screen.findByRole('button', { name: /Save/i });

    Object.defineProperty(saveButton, 'disabled', { value: false });
    
    fireEvent.click(saveButton);
  });
});


