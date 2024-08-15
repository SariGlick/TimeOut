import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import {
  TextField,
  IconButton,
  Button,
  Typography,
  Box,
  Drawer,
  Slide,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import {
  INPUT_LABELS,
  TOOLTIP_TEXTS,
  BUTTON_LABELS,
  MESSAGES,
  TYPOGRAPHY_TEXT
} from '../../constants/googleMapConstants.js';
import '../../styles/googleMapStyle.scss';

const API_KEY = 'AIzaSyBma6gTpaH2g9vULEUtxRnDa2EYert1LJ8';
const LIBRARIES = ['places'];

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const MapComponent = ({ onSaveData }) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES,
  });
  const [address, setAddress] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(10);
  const [locationSelected, setLocationSelected] = useState(false);
  const autocompleteRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const validateAddress = useCallback((address) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(address)}&inputtype=textquery&fields=formatted_address,geometry&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.candidates && data.candidates.length > 0) {
          const place = data.candidates[0];
          const { lat, lng } = place.geometry.location;
          setCenter({ lat: lat, lng: lng });
          setMarkerPosition({ lat: lat, lng: lng });
          setZoom(18);
          setAddress(place.formatted_address);
          setLocationSelected(true);
        } else {
          enqueueSnackbar(<ToastMessage message={MESSAGES.VALID_API_ERROR} type="error" />);
          setLocationSelected(false);
        }
      })
      .catch((error) => enqueueSnackbar(<ToastMessage message={MESSAGES.VALID_API_ERROR} type="error" />));
  }, []);

  const getUserLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        setMarkerPosition({ lat: latitude, lng: longitude });
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.results && data.results.length > 0) {
              setAddress('');
            } else {
              enqueueSnackbar(<ToastMessage message={MESSAGES.VALID_API_ERROR} type="error" />);
            }
          })
          .catch((error) => enqueueSnackbar(<ToastMessage message={MESSAGES.VALID_API_ERROR} type="error" />));
      },
      (error) => {
        enqueueSnackbar(<ToastMessage message={MESSAGES.GET_LOCATION_ERROR} type="error" />);
        setCenter(defaultCenter);
        setZoom(2);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      getUserLocation();
    } else {
      enqueueSnackbar(<ToastMessage message={MESSAGES.NOT_SUPPORTED_ERROR} type="error" />);
    }
  }, [getUserLocation]);

  useEffect(() => {
    if (isLoaded && drawerOpen) {
      const timer = setTimeout(() => {
        if (autocompleteRef.current) {
          const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
            types: ['geocode'],
          });
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              const { lat, lng } = place.geometry.location;
              setCenter({ lat: lat(), lng: lng() });
              setMarkerPosition({ lat: lat(), lng: lng() });
              setAddress(place.formatted_address);
              setLocationSelected(true);
              setZoom(18);
            }
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, drawerOpen]);

  const onSearchClick = () => {
    if (address.trim()) {
      validateAddress(address);
    } else {
      enqueueSnackbar(<ToastMessage message={MESSAGES.VALID_ADDRESS_ERROR} type="error" />);
    }
  };

  const onMapClick = useCallback((e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
          setMarkerPosition({ lat, lng });
          setLocationSelected(true);
        } else {
          enqueueSnackbar(<ToastMessage message={MESSAGES.ERROR_LOADING_MAPS} type="error" />);
        }
      })
      .catch((error) => enqueueSnackbar(<ToastMessage message={MESSAGES.ERROR_LOADING_MAPS} type="error" />));
  }, []);

  const onSave = () => {
    if (onSaveData) {
      onSaveData({ address, markerPosition });
    }
    setDrawerOpen(false);
  };

  if (loadError) return enqueueSnackbar(<ToastMessage message={MESSAGES.ERROR_LOADING_MAPS} type="error" />);
  if (!isLoaded) return null;

  return (
    <Box display="flex">
      <Button data-testid="open-map-button" sx={{ color: 'rgb(103, 252, 210)' }} onClick={() => setDrawerOpen(true)}>
        {BUTTON_LABELS.OPEN_MAP}
      </Button>
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        transitionDuration={300}
        sx={{ zIndex: 1400 }}
        onOpen={() => console.log('Drawer opened')}
      >
        <Box width="100%">
          <Slide direction="up" in={drawerOpen} timeout={300}>
            <Box display="flex" width="100%" height="100%">
              <Box width="75%">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={zoom}
                  onClick={onMapClick}
                >
                  {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
              </Box>
              <Box
                width="25%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                padding="16px"
                boxSizing="border-box"
                height="100%"
              >
                <TextField
                  className="autocomplete-input"
                  fullWidth
                  inputRef={autocompleteRef}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={INPUT_LABELS.ADDRESS}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={onSearchClick}>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
                <Typography variant="body1" className='text'>
                  {locationSelected
                    ? TYPOGRAPHY_TEXT.ADDRESS_SAVED
                    : TYPOGRAPHY_TEXT.SELECT_AREA}
                </Typography>
                <Box display="flex" justifyContent="space-between" width="100%" marginTop="16px">
                  <Tooltip title={TOOLTIP_TEXTS.CANCEL}>
                    <Button sx={{ color: 'rgb(103, 252, 210)', width: '48%' }} onClick={() => setDrawerOpen(false)}>
                      {BUTTON_LABELS.CANCEL}
                    </Button>
                  </Tooltip>
                  <Tooltip title={TOOLTIP_TEXTS.SAVE}>
                    <Button color="success" type="submit" sx={{ width: '48%' }} onClick={onSave} disabled={!locationSelected}>
                      {BUTTON_LABELS.SAVE}
                    </Button>
                  </Tooltip>
                </Box>
                <Box flexGrow={1} display="flex" className='address-text' flexDirection="column" justifyContent="flex-end" width="100%">
                  {locationSelected && <Typography variant="body2" >
                    {TYPOGRAPHY_TEXT.SELECT_ADDRESS} <br />
                    {address}
                  </Typography>}
                </Box>
              </Box>
            </Box>
          </Slide>
        </Box>
      </Drawer>
    </Box>
  );
}
export default MapComponent;