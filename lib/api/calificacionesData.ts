export async function getCalificacionesKPIs() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return {
      promedioGlobal: 4.2,
      totalResenas: 1845,
      reportesPendientes: 12,
    };
  }

  try {
    const res = await fetch(
      "https://feedback-app.vercel.app/api/admin/metricas/calificaciones/kpis",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return { promedioGlobal: 0, totalResenas: 0, reportesPendientes: 0 };
  }
}

export async function getDistribucionCalificaciones() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { estrellas: 5, cantidad: 1100 },
      { estrellas: 4, cantidad: 450 },
      { estrellas: 3, cantidad: 180 },
      { estrellas: 2, cantidad: 65 },
      { estrellas: 1, cantidad: 50 },
    ];
  }

  try {
    const res = await fetch(
      "https://feedback-app.vercel.app/api/admin/metricas/calificaciones/distribucion",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getEvolucionPromedio() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { mes: "Ene", promedio: 3.8 },
      { mes: "Feb", promedio: 3.9 },
      { mes: "Mar", promedio: 4.1 },
      { mes: "Abr", promedio: 4.0 },
      { mes: "May", promedio: 4.2 },
      { mes: "Jun", promedio: 4.2 },
    ];
  }

  try {
    const res = await fetch(
      "https://feedback-app.vercel.app/api/admin/metricas/calificaciones/evolucion",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getVendedoresEnRiesgo() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      {
        id: "VEND-104",
        nombre: "Perfumes Express",
        promedio: 2.1,
        resenas: 45,
      },
      {
        id: "VEND-089",
        nombre: "Aromas Baratos",
        promedio: 2.4,
        resenas: 12,
      },
      {
        id: "VEND-211",
        nombre: "Juan Carlos Tester",
        promedio: 2.8,
        resenas: 8,
      },
    ];
  }

  try {
    const res = await fetch(
      "https://feedback-app.vercel.app/api/admin/metricas/vendedores/riesgo?umbral=3.0",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
