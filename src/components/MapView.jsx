import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

const URGENCIA_CORES = {
  alta: "#E53E3E",
  media: "#D97706",
  baixa: "#6B7280",
};

const STATUS_CORES = {
  ABERTA: "#D97706",
  "EM ATENDIMENTO": "#3B82F6",
  RESOLVIDA: "#10B981",
  CANCELADA: "#6B7280",
};

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
  ocorrencias = [],
  onOcorrenciaClick,
  onMapClick,
  ocorrenciaAtiva = null,
  selectedLocation = null, // NOVA PROP: para mostrar o pin selecionado no form
  centroInicial = { lat: -22.9774, lng: -49.8661 }, // Ajustado para centro de Ourinhos
  zoom = 14,
}) {
  const mapaRef = useRef(null);
  const googleMapRef = useRef(null);
  const marcadoresRef = useRef([]);
  const selectedMarkerRef = useRef(null); // Ref para o pin de seleção
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [apiCarregada, setApiCarregada] = useState(false);

  // 1: Carregamento da API
  useEffect(() => {
    if (window.google?.maps) {
      setApiCarregada(true);
      return;
    }
    const chave = import.meta.env.VITE_GOOGLE_MAPS_KEY;

    console.log("Mapa carregando com a chave:", chave);
    if (!chave) {
      setErro("Chave da API não encontrada no .env");
      setCarregando(false);
      return;
    }
    window.__googleMapsCallback = () => setApiCarregada(true);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${chave}&callback=__googleMapsCallback&language=pt-BR`;
    script.async = true;
    document.head.appendChild(script);
    return () => delete window.__googleMapsCallback;
  }, []);

  // 2: Inicialização do Mapa e Listener de Clique
  useEffect(() => {
    if (!apiCarregada || !mapaRef.current) return;

    googleMapRef.current = new window.google.maps.Map(mapaRef.current, {
      center: selectedLocation || centroInicial,
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    googleMapRef.current.addListener("click", (e) => {
      if (onMapClick) {
        onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      }
    });

    setCarregando(false);
  }, [apiCarregada]);

  // 3: Marcador de Seleção (Para NovaOcorrencia.jsx)
  useEffect(() => {
    if (!googleMapRef.current || !selectedLocation) return;

    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setPosition(selectedLocation);
    } else {
      selectedMarkerRef.current = new window.google.maps.Marker({
        position: selectedLocation,
        map: googleMapRef.current,
        icon: criarIconePin("#3B82F6"), // Azul para o novo pin
        animation: window.google.maps.Animation.BOUNCE,
      });
    }
  }, [selectedLocation]);

  // 4: Atualiza Pins das Ocorrências Existentes
  useEffect(() => {
    if (!googleMapRef.current || !window.google?.maps) return;
    marcadoresRef.current.forEach((m) => m.setMap(null));
    marcadoresRef.current = [];

    ocorrencias.forEach((oc) => {
      if (!oc.latitude || !oc.longitude) return;

      const marcador = new window.google.maps.Marker({
        position: { lat: oc.latitude, lng: oc.longitude },
        map: googleMapRef.current,
        icon: criarIconePin(URGENCIA_CORES[oc.urgencia] || "#6B7280"),
      });

      marcador.addListener("click", () => onOcorrenciaClick?.(oc));
      marcadoresRef.current.push(marcador);
    });
  }, [ocorrencias, apiCarregada]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mapaRef} style={{ width: "100%", height: "100%" }} />

      {carregando && (
        <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <p className="text-xs text-slate-500">Iniciando mapa oficial...</p>
        </div>
      )}

      {erro && (
        <div className="absolute inset-0 bg-red-50 flex flex-col items-center justify-center p-6 text-center">
          <MapPin className="w-8 h-8 text-red-400 mb-2" />
          <p className="text-sm font-bold text-red-900">Erro na API do Google</p>
          <p className="text-xs text-red-600">{erro}</p>
        </div>
      )}
    </div>
  );
}
