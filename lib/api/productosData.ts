export async function getProductosKPIs() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return {
      total: 3450,
      activos: 2800,
      pausados: 450,
    };
  }

  try {
    const res = await fetch(
      "https://seller-app.vercel.app/api/admin/metricas/productos/kpis",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return { total: 0, activos: 0, pausados: 0 };
  }
}

export async function getTopProductos() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { titulo: "Dior Sauvage", vendidas: 145 },
      { titulo: "Chanel N°5", vendidas: 120 },
      { titulo: "Paco Rabanne 1 Million", vendidas: 98 },
      { titulo: "Carolina Herrera Good Girl", vendidas: 85 },
      { titulo: "Armani Code", vendidas: 70 },
    ];
  }

  try {
    const res = await fetch(
      "https://seller-app.vercel.app/api/admin/metricas/productos/top",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getDistribucionCategorias() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      { categoria: "Mujer", cantidad: 1500 },
      { categoria: "Hombre", cantidad: 1200 },
      { categoria: "Cítrico", cantidad: 750 },
    ];
  }

  try {
    const res = await fetch(
      "https://seller-app.vercel.app/api/admin/metricas/productos/categorias",
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.map((d: any) => ({
      ...d,
      fill: `var(--color-${d.categoria.toLowerCase()})`,
    }));
  } catch (error) {
    return [];
  }
}

export async function getUltimosProductos() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    return [
      {
        producto_id: 101,
        titulo: "Bleu de Chanel 100ml",
        precio: 125000,
        stock: 1,
        estado: "activo",
      },
      {
        producto_id: 102,
        titulo: "Versace Eros",
        precio: 45000,
        stock: 1,
        estado: "activo",
      },
      {
        producto_id: 103,
        titulo: "Givenchy My Way",
        precio: 95000,
        stock: 0,
        estado: "pausado",
      },
      {
        producto_id: 104,
        titulo: "Natura Homem",
        precio: 25000,
        stock: 1,
        estado: "activo",
      },
      {
        producto_id: 105,
        titulo: "Perfume falso",
        precio: 1000,
        stock: 5,
        estado: "borrado",
      },
    ];
  }

  try {
    const res = await fetch(
      "https://seller-app.vercel.app/api/admin/productos/ultimos",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
