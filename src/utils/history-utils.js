export const parseHexFloat = (hex) => {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  for (let i = 0; i < 8; i++) {
    view.setUint8(i, parseInt(hex.substr(i * 2, 2), 16));
  }
  return view.getFloat64(0, true);
};

export const wkbToLatLng = (data) => {
  if (!data) return null;

  // Caso Texto
  if (typeof data === "string" && data.startsWith("POINT")) {
    const match = data.match(/POINT\s*\((-?\d+\.?\d*)\s+(-?\d+\.?\d*)\)/);
    if (match) return { lon: parseFloat(match[1]), lat: parseFloat(match[2]) };
  }

  // Caso Hex EWKB
  if (
    typeof data === "string" &&
    data.length > 20 &&
    /^[0-9A-Fa-f]+$/.test(data)
  ) {
    try {
      const lonHex = data.substring(18, 34);
      const latHex = data.substring(34, 50);
      const lon = parseHexFloat(lonHex);
      const lat = parseHexFloat(latHex);
      if (!isNaN(lon) && !isNaN(lat)) return { lon, lat };
    } catch (e) {
      console.error("Error parsing Hex WKB", e);
    }
  }
  return null;
};

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const handleOpenMap = (item) => {
  const coords = wkbToLatLng(item.location);
  if (coords) {
    const url = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lon}`;
    window.open(url, "_blank");
  }
};
