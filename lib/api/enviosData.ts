export async function getEnviosKPIs() {
  const useRealApi = process.env.useRealApi === "true";

  if (!useRealApi) {
    return {
      enTransito: 142,
      entregadosHoy: 38,
      tiempoPromedio: 2.4,
    };
  }

  try {
    const res = await fetch(
      "https://shipping-app.vercel.app/api/admin/metricas/kpis",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return { enTransito: 0, entregadosHoy: 0, tiempoPromedio: 0 };
  }
}

export async function getDistribucionEstados() {
  const useRealApi = process.env.useRealApi === "true";

  if (!useRealApi) {
    return [
      { estado: "En Preparación", cantidad: 85 },
      { estado: "Retirado", cantidad: 40 },
      { estado: "En Tránsito", cantidad: 142 },
      { estado: "Entregado", cantidad: 320 },
    ];
  }

  try {
    const res = await fetch(
      "https://shipping-app.vercel.app/api/admin/metricas/estados",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getEnviosPorOperador() {
  const useRealApi = process.env.useRealApi === "true";

  if (!useRealApi) {
    return [
      { operador: "Andreani", envios: 310 },
      { operador: "Correo Argentino", envios: 185 },
      { operador: "OCASA", envios: 92 },
    ];
  }

  try {
    const res = await fetch(
      "https://shipping-app.vercel.app/api/admin/metricas/operadores",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getVolumenEnviosDia() {
  const useRealApi = process.env.useRealApi === "true";

  if (!useRealApi) {
    return [
      { dia: "Lun", despachados: 45 },
      { dia: "Mar", despachados: 52 },
      { dia: "Mié", despachados: 38 },
      { dia: "Jue", despachados: 65 },
      { dia: "Vie", despachados: 80 },
      { dia: "Sáb", despachados: 20 },
      { dia: "Dom", despachados: 5 },
    ];
  }

  try {
    const res = await fetch(
      "https://shipping-app.vercel.app/api/admin/metricas/volumen-diario",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
