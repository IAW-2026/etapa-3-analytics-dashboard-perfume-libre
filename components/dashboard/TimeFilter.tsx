"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function FilterSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("days") || "90";
  const [localDays, setLocalDays] = useState(current);

  useEffect(() => {
    setLocalDays(current);
  }, [current]);

  return (
    <select 
      value={localDays}
      onChange={(e) => {
        setLocalDays(e.target.value);
        router.push(`/?days=${e.target.value}`);
      }}
      className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
    >
      <option value="90">Últimos 3 meses</option>
      <option value="30">Últimos 30 días</option>
      <option value="7">Últimos 7 días</option>
      <option value="0">Histórico Completo</option>
    </select>
  );
}

export function TimeFilter() {
  return (
    <Suspense fallback={<select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"><option>Últimos 3 meses</option></select>}>
      <FilterSelect />
    </Suspense>
  );
}
