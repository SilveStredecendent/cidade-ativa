import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { LocateFixed, Search, X, Loader2 } from "lucide-react";
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

const ClickedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function FlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 16, { duration: 1.2 });
    }
  }, [position]);
  return null;
}

function LocationButton({ onLocationFound }) {
  const map = useMap();
  useMapEvents({
    locationfound(e) {
      onLocationFound(e.latlng);
    },
    locationerror() {
      alert("Não foi possível obter sua localização.");
    },
  });
  return (
    <button
      onClick={() => map.locate({ setView: true, maxZoom: 16 })}
      title="Minha localização"
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
      onMapClick?.([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function SearchBar({ onResult }) {
  const [query, setQuery] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aberto, setAberto] = useState(false);
  const timerRef = useRef(null);

  function handleChange(e) {
    const valor = e.target.value;
    setQuery(valor);
    clearTimeout(timerRef.current);

    if (valor.trim().length < 3) {
      setSugestoes([]);
      setAberto(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?` + `q=${encodeURIComponent(valor)}` + `&format=json&limit=5&countrycodes=br`;

        const res = await fetch(url, {
          headers: { "Accept-Language": "pt-BR" },
        });
        const data = await res.json();
        setSugestoes(data);
        setAberto(data.length > 0);
      } catch {
        setSugestoes([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  }

  function selecionar(item) {
    setQuery(item.display_name.split(",")[0]);
    setSugestoes([]);
    setAberto(false);
    onResult({ lat: parseFloat(item.lat), lng: parseFloat(item.lon) });
  }

  function limpar() {
    setQuery("");
    setSugestoes([]);
    setAberto(false);
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "min(380px, calc(100% - 100px))",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: "8px",
          border: "1.5px solid #e2e8f0",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          padding: "0 12px",
          height: "40px",
          gap: "8px",
        }}
      >
        {loading ? (
          <Loader2 size={15} style={{ color: "#94a3b8", flexShrink: 0, animation: "spin .8s linear infinite" }} />
        ) : (
          <Search size={15} style={{ color: "#94a3b8", flexShrink: 0 }} />
        )}
        <input
          type="text"
          placeholder="Buscar endereço"
          value={query}
          onChange={handleChange}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "13px",
            color: "#0f172a",
            background: "transparent",
          }}
        />
        {query && (
          <button
            onClick={limpar}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {aberto && sugestoes.length > 0 && (
        <div
          style={{
            marginTop: "4px",
            background: "white",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        >
          {sugestoes.map((item, i) => (
            <button
              key={i}
              onClick={() => selecionar(item)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 14px",
                background: "none",
                border: "none",
                borderBottom: i < sugestoes.length - 1 ? "1px solid #f1f5f9" : "none",
                cursor: "pointer",
                transition: "background .1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <p style={{ fontSize: "13px", fontWeight: "500", color: "#0f172a", margin: "0 0 2px" }}>{item.display_name.split(",")[0]}</p>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.display_name.split(",").slice(1, 4).join(",")}
              </p>
            </button>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

export default function MapView({ center = [-22.97, -49.87], zoom = 14, occurrences = [], onMapClick, activeId }) {
  const [userPosition, setUserPosition] = useState(null);
  const [clickedPos, setClickedPos] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  function handleMapClick(coords) {
    setClickedPos({ lat: coords[0], lng: coords[1] });
    onMapClick?.(coords);
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationButton onLocationFound={setUserPosition} />
        <ClickHandler onMapClick={handleMapClick} />

        {searchResult && <FlyTo position={searchResult} />}

        {userPosition && (
          <Marker position={userPosition} icon={UserIcon}>
            <Popup>Você está aqui</Popup>
          </Marker>
        )}

        {clickedPos && (
          <Marker position={[clickedPos.lat, clickedPos.lng]} icon={ClickedIcon}>
            <Popup>Local selecionado</Popup>
          </Marker>
        )}

        {occurrences.map((oc) => {
          const lat = oc.lat ?? oc.latitude;
          const lng = oc.lng ?? oc.longitude;
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

      <SearchBar onResult={setSearchResult} />
    </div>
  );
}
