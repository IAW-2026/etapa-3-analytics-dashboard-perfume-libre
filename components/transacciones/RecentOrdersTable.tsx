import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function RecentOrdersTable({ data }: { data: any[] }) {
  // Función helper para pintar los badges según el estado
  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "completada":
        return "default";
      case "en_curso":
        return "secondary";
      case "cancelada":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="col-span-3 mt-6">
      <CardHeader>
        <CardTitle>Últimas Órdenes Procesadas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Orden</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((orden) => (
              <TableRow key={orden.id}>
                <TableCell className="font-medium">{orden.id}</TableCell>
                <TableCell>{orden.cliente}</TableCell>
                <TableCell>{orden.fecha}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(orden.estado)}>
                    {orden.estado.replace("_", " ").toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ${orden.monto.toLocaleString("es-AR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
