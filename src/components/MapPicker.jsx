import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { LocateFixed } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerShadow from "leaflet/dist/images/marker-shadow.png";

const ClickedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function LocationPickerButton({ onLocationSelect }) {
  const map = useMap();

  useMapEvents({
    locationfound(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
    locationerror() {
      alert("Não foi possível obter sua localização. Clique no mapa manualmente.");
    },
  });

  return (
    <button
      type="button"
      onClick={() => map.locate({ setView: true, maxZoom: 16 })}
      title="Usar minha localização atual"
      style={{
        position: "absolute",
        top: "80px",
        left: "10px",
        zIndex: 1000,
        background: "white",
        border: "2px solid rgba(0,0,0,0.2)",
        borderRadius: "4px",
        width: "34px",
        height: "34px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#333",
        boxShadow: "0 1px 5px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f4f4f4")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
    >
      <LocateFixed size={18} />
    </button>
  );
}

function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function MapPicker({ center = [-22.97, -49.87], zoom = 14, selectedLocation, onLocationSelect }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationPickerButton onLocationSelect={onLocationSelect} />
        <MapClickHandler onLocationSelect={onLocationSelect} />

        {selectedLocation && selectedLocation.lat != null && selectedLocation.lng != null && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={ClickedIcon}>
            <Popup>Local da Ocorrência</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
