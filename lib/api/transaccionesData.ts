export async function getTransaccionesKPIs() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return {
      ticketPromedio: 12500,
      tasaConversion: 3.2,
      ordenesCanceladas: 14,
    };
  }

  try {
    const res = await fetch(
      "https://buyer-app.vercel.app/api/admin/metricas/transacciones/kpis",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo KPIs de transacciones:", error);
    return { ticketPromedio: 0, tasaConversion: 0, ordenesCanceladas: 0 };
  }
}

export async function getRevenueAcumuladoData() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { fecha: "01/06", acumulado: 15000 },
      { fecha: "05/06", acumulado: 32000 },
      { fecha: "10/06", acumulado: 54000 },
      { fecha: "15/06", acumulado: 89000 },
      { fecha: "20/06", acumulado: 112000 },
      { fecha: "25/06", acumulado: 145000 },
    ];
  }

  try {
    const res = await fetch(
      "https://buyer-app.vercel.app/api/admin/metricas/revenue-acumulado",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getOrdenesPorDiaData() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { dia: "Lunes", ordenes: 120 },
      { dia: "Martes", ordenes: 95 },
      { dia: "Miércoles", ordenes: 110 },
      { dia: "Jueves", ordenes: 140 },
      { dia: "Viernes", ordenes: 210 },
      { dia: "Sábado", ordenes: 250 },
      { dia: "Domingo", ordenes: 180 },
    ];
  }

  try {
    const res = await fetch(
      "https://buyer-app.vercel.app/api/admin/metricas/ordenes-por-dia",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getUltimasOrdenes() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      {
        id: "ORD-001",
        cliente: "Juan Pérez",
        fecha: "2026-06-25",
        monto: 15400,
        estado: "completada",
      },
      {
        id: "ORD-002",
        cliente: "María Gómez",
        fecha: "2026-06-25",
        monto: 8200,
        estado: "en_curso",
      },
      {
        id: "ORD-003",
        cliente: "Carlos Ruiz",
        fecha: "2026-06-24",
        monto: 21000,
        estado: "cancelada",
      },
      {
        id: "ORD-004",
        cliente: "Ana Silva",
        fecha: "2026-06-24",
        monto: 12300,
        estado: "completada",
      },
      {
        id: "ORD-005",
        cliente: "Luis Torres",
        fecha: "2026-06-23",
        monto: 9500,
        estado: "completada",
      },
    ];
  }

  try {
    const res = await fetch(
      "https://buyer-app.vercel.app/api/admin/ordenes/ultimas?limit=20",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
