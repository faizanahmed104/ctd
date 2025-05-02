"use client"
import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// // Replace with your Google Maps API Key
// const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// // Map container styles
// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// // Initial map center coordinates
// const initialCenter = {
//   lat: 37.7749, // San Francisco Latitude
//   lng: -122.4194, // San Francisco Longitude
// };

// // Map styles (optional, for customization)
// const mapStyles = [
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#a4c5f9" }],
//   },
//   {
//     featureType: "landscape",
//     elementType: "geometry",
//     stylers: [{ color: "#e5e5e5" }],
//   },
// ];

const GoogleMapsComponent = () => {
  //   const [markers, setMarkers] = useState([initialCenter]);

  //   // Handle map clicks to add new markers
  //   const handleMapClick = (event) => {
  //     const newMarker = {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //     };
  //     setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  //   };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1KIUNinalqm1O1EX1rav77HNXuSk4ui4&ehbc=2E312F&noprof=1"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  );
};

export default GoogleMapsComponent;
