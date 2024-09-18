import './sos.css';
import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const mapContainerStyle = {
  height: "200px",
  width: "50%",
};

const Sos = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [sosMessage, setSosMessage] = useState(null);

  const handleSOS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          sendSOSAlert(userLocation);
        },
        () => {
          setErrorMsg("Unable to retrieve your location.");
        }
      );
    } else {
      setErrorMsg("Geolocation is not supported by this browser.");
    }
  };

  const sendSOSAlert = (location) => {
    if (location) {
      const sosNumber = "+1234567890";
      const message = `SOS Alert! User is in danger. Location: lat: ${location.lat}, lng: ${location.lng}`;

      console.log(`Sending SOS alert to ${sosNumber}: ${message}`);
      setSosMessage(`SOS alert sent! Location: lat: ${location.lat}, lng: ${location.lng}`);
    } else {
      setErrorMsg("Location not available. Please enable location first.");
    }
  };



  return (
    <div>
          <button onClick={handleSOS}>Send SOS Alert with Location</button>

      {location ? (
        <MapContainer style={mapContainerStyle} center={location} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location} icon={customIcon} />
        </MapContainer>
      ) : (
        <p>{errorMsg}</p>
      )}

      {sosMessage && <p>{sosMessage}</p>}

     
    </div>
  );
};

export default Sos;