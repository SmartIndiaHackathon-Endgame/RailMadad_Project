import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import PropTypes from "prop-types"; 
import "leaflet/dist/leaflet.css";
import './Location.css'; 
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setErrorMsg("Unable to retrieve your location.",error);
        }
      );
    } else {
      setErrorMsg("Geolocation is not supported by this browser.");
    }
  };

  const displayMockContacts = () => {
    const contacts = [
      { name: "Railway Authority A", phone: "+123456789", distance: "2 km" },
      { name: "Railway Authority B", phone: "+987654321", distance: "4 km" },
      { name: "Railway Authority C", phone: "+192837465", distance: "6 km" },
    ];

    return (
      <div>
        <h3>Nearby Railway Authorities:</h3>
        {contacts.map((contact, index) => (
          <div key={index}>
            <p>
              <strong>{contact.name}</strong>
              <br />
              Phone: {contact.phone}
              <br />
              Distance: {contact.distance}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const MapComponent = ({ center }) => {
    const map = useMap();
    map.setView(center, 12);
    return null;
  };

  MapComponent.propTypes = {
    center: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  };

  return (
    <div>
      <h2>Find Nearby Railway Authority Contacts</h2>
      <button onClick={getLocation}>Get Your Location</button>

      {location ? (
        <MapContainer style={mapContainerStyle} center={location} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location} icon={customIcon}></Marker>
          <MapComponent center={location} />
        </MapContainer>
      ) : (
        <p>{errorMsg}</p>
      )}

      {location && displayMockContacts()}
    </div>
  );
};

export default App;
