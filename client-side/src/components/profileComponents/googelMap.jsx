import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 32.0853,
  lng: 34.7818
};

function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY
  });

  const [address, setAddress] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);

  const onMapClick = useCallback((e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.results[0]) {
          setAddress(data.results[0].formatted_address);
          setMarkerPosition({ lat, lng });
        }
      });
  }, []);

  const onInputChange = (e) => {
    setAddress(e.target.value);
  };

  const onSave = () => {
    console.log('Saved address:', address);
    console.log('Marker position:', markerPosition);
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        {markerPosition && (
          <Marker position={markerPosition} />
        )}
      </GoogleMap>
      <input
        type="text"
        value={address}
        onChange={onInputChange}
        placeholder="Enter address"
      />
      <button onClick={onSave}>Save</button>
    </div>
  );
}

export default MapComponent;
