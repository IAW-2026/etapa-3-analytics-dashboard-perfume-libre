export async function getUsuariosKPIs() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return {
      totalUsuarios: 1250, // Vendría de Clerk
      nuevosEsteMes: 85, // Vendría de Clerk
      compradoresRecurrentes: 340, // Vendría de Buyer App (usuarios con > 1 orden)
    };
  }

  try {
    // Acá en el futuro podrías hacer un Promise.all a tu backend que hable con Clerk y con Buyer App
    const res = await fetch(
      "https://tu-buyer-app.vercel.app/api/admin/metricas/usuarios/kpis",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo KPIs de usuarios:", error);
    return { totalUsuarios: 0, nuevosEsteMes: 0, compradoresRecurrentes: 0 };
  }
}

export async function getCrecimientoUsuariosData() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { mes: "Ene", usuarios: 500 },
      { mes: "Feb", usuarios: 700 },
      { mes: "Mar", usuarios: 850 },
      { mes: "Abr", usuarios: 1050 },
      { mes: "May", usuarios: 1150 },
      { mes: "Jun", usuarios: 1250 },
    ];
  }

  try {
    const res = await fetch(
      "https://tu-buyer-app.vercel.app/api/admin/metricas/usuarios/crecimiento",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getCompradoresVsVendedoresData() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { mes: "Ene", compradores: 300, vendedores: 40 },
      { mes: "Feb", compradores: 450, vendedores: 55 },
      { mes: "Mar", compradores: 580, vendedores: 70 },
      { mes: "Abr", compradores: 750, vendedores: 85 },
      { mes: "May", compradores: 820, vendedores: 90 },
      { mes: "Jun", compradores: 910, vendedores: 110 },
    ];
  }

  try {
    const res = await fetch(
      "https://tu-buyer-app.vercel.app/api/admin/metricas/usuarios/roles",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getTopCompradores() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      {
        id: "USR-01",
        nombre: "Martín López",
        email: "martin@email.com",
        ordenes: 12,
        gastado: 245000,
      },
      {
        id: "USR-02",
        nombre: "Sofía Martínez",
        email: "sofia@email.com",
        ordenes: 8,
        gastado: 180500,
      },
      {
        id: "USR-03",
        nombre: "Diego Fernández",
        email: "diego@email.com",
        ordenes: 15,
        gastado: 150000,
      },
      {
        id: "USR-04",
        nombre: "Lucía Gómez",
        email: "lucia@email.com",
        ordenes: 5,
        gastado: 95000,
      },
      {
        id: "USR-05",
        nombre: "Carlos Tevez",
        email: "carlos@email.com",
        ordenes: 3,
        gastado: 88000,
      },
    ];
  }

  try {
    const res = await fetch(
      "https://tu-buyer-app.vercel.app/api/admin/metricas/usuarios/top-compradores?limit=10",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
