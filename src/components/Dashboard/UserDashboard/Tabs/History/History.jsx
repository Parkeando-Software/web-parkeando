import { useState, useEffect, useMemo } from "react";
import { Filter } from "lucide-react";
import { wkbToLatLng } from "@utils/history-utils";
import HistoryStats from "@components/Dashboard/UserDashboard/Tabs/History/HistoryStats";
import HistoryList from "@components/Dashboard/UserDashboard/Tabs/History/HistoryList";
import DateFilters from "@components/Dashboard/UserDashboard/Tabs/History/DateFilters";
import EmptyDateSelection from "@components/Dashboard/UserDashboard/Tabs/History/EmptyDateSelection";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // 1. Fetch Data
  useEffect(() => {
    const fetchParkingHistory = async () => {
      try {
        setLoading(true);
        const token =
          localStorage.getItem("userToken") ||
          localStorage.getItem("authToken");

        if (!token) {
          setHistory([]);
          setLoading(false);
          return;
        }

        const res = await fetch(
          import.meta.env.VITE_API_URL + "/parking-history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        const finalData = Array.isArray(data) ? data : data.data || [];
        setHistory(finalData);
      } catch (err) {
        console.error(err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingHistory();
  }, []);

  // 2. Calcular años disponibles
  const availableYears = useMemo(() => {
    if (!history || history.length === 0) return [];
    
    const years = history.map(item => {
      const date = new Date(item.created_at);
      return date.getFullYear();
    });
    
    // Obtener años únicos y ordenarlos de más reciente a más antiguo
    return [...new Set(years)].sort((a, b) => b - a);
  }, [history]);

  // 3. Calcular meses disponibles para el año seleccionado
  const availableMonths = useMemo(() => {
    if (!selectedYear || !history || history.length === 0) return [];
    
    const months = history
      .filter(item => {
        const date = new Date(item.created_at);
        return date.getFullYear() === selectedYear;
      })
      .map(item => {
        const date = new Date(item.created_at);
        return date.getMonth() + 1; // getMonth() devuelve 0-11, necesitamos 1-12
      });
    
    // Obtener meses únicos y ordenarlos
    return [...new Set(months)].sort((a, b) => a - b);
  }, [history, selectedYear]);

  // 4. Handlers para cambios de filtros
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null); // Resetear mes al cambiar año
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // 5. Filtrar historial por año, mes y tipo
  const filteredHistory = useMemo(() => {
    if (!selectedYear || !selectedMonth) return [];
    
    return history.filter(item => {
      const date = new Date(item.created_at);
      const itemYear = date.getFullYear();
      const itemMonth = date.getMonth() + 1;
      
      // Filtrar por año y mes
      if (itemYear !== selectedYear || itemMonth !== selectedMonth) {
        return false;
      }
      
      // Filtrar por tipo
      if (filter !== "all") {
        return item.type?.toLowerCase() === filter;
      }
      
      return true;
    });
  }, [history, selectedYear, selectedMonth, filter]);

  // 6. Fetch Addresses (Nominatim) - Solo para el historial filtrado
  useEffect(() => {
    async function fetchAddresses() {
      if (!filteredHistory || filteredHistory.length === 0) {
        setAddresses([]);
        return;
      }

      const results = await Promise.all(
        filteredHistory.map(async (parking) => {
          const coords = wkbToLatLng(parking.location);
          if (!coords) return "Ubicación no procesable";

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lon}&zoom=18`
            );
            if (!res.ok) return "Error de red en mapa";
            const data = await res.json();

            const addr = data.address || {};
            const road =
              addr.road || addr.pedestrian || addr.street || "Calle sin nombre";
            const number = addr.house_number ? `, ${addr.house_number}` : "";
            return (
              `${road}${number}` ||
              data.display_name.split(",")[0] ||
              "Dirección encontrada"
            );
          } catch {
            return "Dirección no disponible";
          }
        })
      );
      setAddresses(results);
    }

    if (!loading && filteredHistory.length > 0) fetchAddresses();
  }, [filteredHistory, loading]);

  // 7. Cálculos de estadísticas (solo para el periodo seleccionado)
  const totalParkings = filteredHistory.length;
  const releasedCount = filteredHistory.filter(
    (p) => p.type?.toLowerCase() === "released"
  ).length;
  const occupiedCount = filteredHistory.filter(
    (p) => p.type?.toLowerCase() === "occupied"
  ).length;

  // 8. Preparar datos para la lista (Combinar item + dirección)
  const viewData = useMemo(() => {
    return filteredHistory.map((item, index) => ({
      item: item,
      address: addresses[index] || "Cargando ubicación...",
    }));
  }, [filteredHistory, addresses]);

  // 9. Determinar si mostrar contenido
  const showContent = selectedYear && selectedMonth;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-slate-700 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Histórico
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Registro detallado de tus movimientos.
          </p>
        </div>

        {showContent && (
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
            <Filter size={14} />
            Filtro:{" "}
            <span className="uppercase text-[#0083E6]">
              {filter === "all"
                ? "Todos"
                : filter === "released"
                ? "Liberados"
                : "Ocupados"}
            </span>
          </div>
        )}
      </div>

      {/* DATE FILTERS */}
      <DateFilters
        availableYears={availableYears}
        availableMonths={availableMonths}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
      />

      {/* CONTENT - Solo mostrar si hay año y mes seleccionados */}
      {showContent ? (
        <>
          {/* STATS GRID */}
          <HistoryStats
            total={totalParkings}
            released={releasedCount}
            occupied={occupiedCount}
            filter={filter}
            setFilter={setFilter}
          />

          {/* MAIN LIST */}
          <HistoryList loading={loading} data={viewData} />
        </>
      ) : (
        <EmptyDateSelection />
      )}
    </div>
  );
}
