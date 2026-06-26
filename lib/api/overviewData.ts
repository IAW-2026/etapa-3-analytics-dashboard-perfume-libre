export type OverviewMetrics = {
  totalOrdenes: number;
  revenueTotal: number;
  usuariosActivos: number;
  calificacionPromedio: number;
};

export async function getOverviewMetricas(): Promise<OverviewMetrics> {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      totalOrdenes: 1248,
      revenueTotal: 45200.5,
      usuariosActivos: 342,
      calificacionPromedio: 4.3,
    };
  }

  try {
    const [ordenesRes, usuariosRes, feedbackRes] = await Promise.all([
      fetch("https://buyer-app.vercel.app/api/admin/ordenes/metricas"),
      fetch("https://buyer-app.vercel.app/api/admin/usuarios/activos"),
      fetch(
        "https://feedback-app.vercel.app/api/admin/calificaciones/promedio",
      ),
    ]);

    const ordenes = await ordenesRes.json();
    const usuarios = await usuariosRes.json();
    const feedback = await feedbackRes.json();

    return {
      totalOrdenes: ordenes.total,
      revenueTotal: ordenes.revenue,
      usuariosActivos: usuarios.total,
      calificacionPromedio: feedback.promedio,
    };
  } catch (error) {
    console.error("Error obteniendo métricas reales:", error);
    return {
      totalOrdenes: 0,
      revenueTotal: 0,
      usuariosActivos: 0,
      calificacionPromedio: 0,
    };
  }
}

export async function getRevenueData() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { nombre: "Lun", revenue: 4500 },
      { nombre: "Mar", revenue: 5200 },
      { nombre: "Mié", revenue: 3800 },
      { nombre: "Jue", revenue: 6100 },
      { nombre: "Vie", revenue: 7500 },
      { nombre: "Sáb", revenue: 8200 },
      { nombre: "Dom", revenue: 6900 },
    ];
  }

  try {
    const res = await fetch(
      "https://buyer-app.vercel.app/api/admin/ordenes/serie-temporal",
    );

    if (!res.ok) throw new Error("API error");

    return await res.json();
  } catch (error) {
    console.error("Error obteniendo revenue:", error);
    return [];
  }
}

export async function getOrderStatusData() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { estado: "completada", cantidad: 350, fill: "var(--color-completada)" },
      { estado: "en_curso", cantidad: 120, fill: "var(--color-en_curso)" },
      { estado: "cancelada", cantidad: 30, fill: "var(--color-cancelada)" },
    ];
  }

  try {
    const res = await fetch(
      "https://buyer-app.vercel.app/api/admin/metricas/ordenes/por-estado",
    );
    const data = await res.json();
    return Object.entries(data).map(([key, value]) => ({
      estado: key,
      cantidad: Number(value),
      fill: `var(--color-${key})`,
    }));
  } catch (error) {
    console.error("Error obteniendo estados:", error);
    return [];
  }
}
