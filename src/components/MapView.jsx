import React, { useState } from "react"; // Adicionando useState
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { LocateFixed } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const UserIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function LocationButton({ onLocationFound }) {
  const map = useMap();

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  useMapEvents({
    locationfound(e) {
      console.log("Sua localização:", e.latlng);
      if (onLocationFound) onLocationFound(e.latlng); // Envia as coordenadas para o componente pai
    },
    locationerror() {
      alert("Não foi possível obter sua localização. Verifique as permissões do navegador.");
    },
  });

  return (
    <button
      onClick={handleLocate}
      title="Minha Localização"
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

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapView({ center = [-22.97, -49.87], zoom = 14, occurrences = [], onMapClick }) {
  const [userPosition, setUserPosition] = useState(null);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationButton onLocationFound={setUserPosition} />

        {onMapClick && <ClickHandler onMapClick={onMapClick} />}

        {userPosition && (
          <Marker position={userPosition} icon={UserIcon}>
            <Popup>Você está aqui!</Popup>
          </Marker>
        )}

        {occurrences.map((oc) => {
          const lat = oc.lat !== undefined ? oc.lat : oc.latitude;
          const lng = oc.lng !== undefined ? oc.lng : oc.longitude;
          if (lat == null || lng == null) return null;

          return (
            <Marker key={oc.id} position={[lat, lng]}>
              <Popup>
                <div style={{ fontSize: "12px" }}>
                  <strong>{oc.titulo}</strong>
                  <br />
                  {oc.local}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
