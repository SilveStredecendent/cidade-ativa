import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

// Cores por urgência — usadas nos pins do mapa
const URGENCIA_CORES = {
  alta: "#E53E3E",
  media: "#D97706",
  baixa: "#6B7280",
};

// Cores por status
const STATUS_CORES = {
  ABERTA: "#D97706",
  "EM ATENDIMENTO": "#3B82F6",
  RESOLVIDA: "#10B981",
  CANCELADA: "#6B7280",
};

// Ícone SVG de pin para o Google Maps
function criarIconePin(cor) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z"
        fill="${cor}" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `;
  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
    scaledSize: { width: 28, height: 35 },
    anchor: { x: 14, y: 35 },
  };
}

export default function MapView({
  ocorrencias = [], // Array de ocorrências para mostrar no mapa
  onOcorrenciaClick, // Callback ao clicar em um pin
  ocorrenciaAtiva = null, // ID da ocorrência selecionada
  centroInicial = { lat: -23.0019, lng: -49.8701 }, // Ourinhos - SP
  zoom = 14,
}) {
  const mapaRef = useRef(null); // Referência ao elemento div do mapa
  const googleMapRef = useRef(null); // Instância do Google Maps
  const marcadoresRef = useRef([]); // Array de marcadores no mapa
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [apiCarregada, setApiCarregada] = useState(false);

  // 1: Carrega o script do Google Maps
  useEffect(() => {
    if (window.google?.maps) {
      setApiCarregada(true);
      return;
    }

    const chave = import.meta.env.VITE_GOOGLE_MAPS_KEY;

    if (!chave) {
      setErro("Chave da API do Google Maps não encontrada no .env");
      setCarregando(false);
      return;
    }

    window.__googleMapsCallback = () => {
      setApiCarregada(true);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${chave}&callback=__googleMapsCallback&language=pt-BR`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setErro("Erro ao carregar Google Maps. Verifique a chave da API.");
      setCarregando(false);
    };

    document.head.appendChild(script);

    return () => {
      delete window.__googleMapsCallback;
    };
  }, []);

  // 2: Inicializa o mapa quando a API estiver pronta
  useEffect(() => {
    if (!apiCarregada || !mapaRef.current) return;

    googleMapRef.current = new window.google.maps.Map(mapaRef.current, {
      center: centroInicial,
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER,
      },
      styles: [
        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
        { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
      ],
    });

    setCarregando(false);
  }, [apiCarregada]);

  // 3: Atualiza os pins sempre que as ocorrências mudarem
  useEffect(() => {
    if (!googleMapRef.current || !window.google?.maps) return;
    marcadoresRef.current.forEach((m) => m.setMap(null));
    marcadoresRef.current = [];

    ocorrencias.forEach((oc) => {
      if (!oc.latitude || !oc.longitude) return;

      const cor = URGENCIA_CORES[oc.urgencia] || URGENCIA_CORES.baixa;
      const icone = criarIconePin(cor);

      const marcador = new window.google.maps.Marker({
        position: { lat: oc.latitude, lng: oc.longitude },
        map: googleMapRef.current,
        title: oc.titulo,
        icon: icone,
        animation: window.google.maps.Animation.DROP,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="
            font-family: 'Geist Variable', sans-serif;
            padding: 4px;
            min-width: 180px;
          ">
            <p style="
              font-size: 13px;
              font-weight: 500;
              margin: 0 0 4px;
              color: #111;
            ">${oc.titulo}</p>
            <p style="
              font-size: 11px;
              color: #666;
              margin: 0 0 6px;
            ">📍 ${oc.local || "Localização não informada"}</p>
            <span style="
              font-size: 11px;
              font-weight: 500;
              padding: 2px 8px;
              border-radius: 999px;
              background: ${STATUS_CORES[oc.status] || "#ccc"}22;
              color: ${STATUS_CORES[oc.status] || "#666"};
            ">${oc.status}</span>
          </div>
        `,
      });

      marcador.addListener("click", () => {
        marcadoresRef.current.forEach((m) => m.__infoWindow?.close());

        infoWindow.open(googleMapRef.current, marcador);
        onOcorrenciaClick?.(oc);
      });

      marcador.__infoWindow = infoWindow;
      marcadoresRef.current.push(marcador);
    });
  }, [ocorrencias, apiCarregada]);

  // 4: Centraliza no pin quando ocorrenciaAtiva mudar
  useEffect(() => {
    if (!googleMapRef.current || !ocorrenciaAtiva) return;

    const oc = ocorrencias.find((o) => o.id === ocorrenciaAtiva);
    if (oc?.latitude && oc?.longitude) {
      googleMapRef.current.panTo({ lat: oc.latitude, lng: oc.longitude });
      googleMapRef.current.setZoom(16);
    }
  }, [ocorrenciaAtiva]);

  // 5: Render
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Div onde o Google Maps renderiza */}
      <div ref={mapaRef} style={{ width: "100%", height: "100%" }} />

      {/* Loading */}
      {carregando && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#e8e0d0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Loader2
            style={{
              width: "28px",
              height: "28px",
              color: "#888",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ fontSize: "13px", color: "#888" }}>Carregando mapa...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* Erro de API */}
      {erro && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#f5f0e8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <MapPin style={{ width: "32px", height: "32px", color: "#E53E3E" }} />
          <p style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>Mapa indisponível</p>
          <p style={{ fontSize: "13px", color: "#888", maxWidth: "280px" }}>{erro}</p>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e0ddd6",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "12px",
              color: "#666",
              textAlign: "left",
              maxWidth: "320px",
            }}
          >
            <strong>Para ativar o mapa:</strong>
            <br />
            1. Crie uma chave em <strong>console.cloud.google.com</strong>
            <br />
            2. Ative a <strong>Maps JavaScript API</strong>
            <br />
            3. Adicione ao <strong>.env</strong>:<br />
            <code style={{ fontSize: "11px" }}>VITE_GOOGLE_MAPS_KEY=sua_chave</code>
          </div>
        </div>
      )}

      {/* Contador de pins — sobreposto ao mapa */}
      {!carregando && !erro && ocorrencias.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "rgba(255,255,255,0.95)",
            borderRadius: "8px",
            padding: "6px 12px",
            fontSize: "12px",
            color: "#555",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <MapPin style={{ width: "12px", height: "12px", color: "#E53E3E" }} />
          {ocorrencias.length} ocorrência{ocorrencias.length !== 1 ? "s" : ""} no mapa
        </div>
      )}
    </div>
  );
}
