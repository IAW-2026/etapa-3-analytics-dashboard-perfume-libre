import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SellersAtRiskTable({ data }: { data: any[] }) {
  return (
    <Card className="col-span-3 mt-6 border-red-200">
      <CardHeader className="bg-red-50/50 rounded-t-xl pb-4">
        <CardTitle className="text-red-700">
          ⚠️ Vendedores en Riesgo (Promedio &lt; 3.0)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Vendedor</TableHead>
              <TableHead>Nombre Comercial</TableHead>
              <TableHead className="text-center">Total Reseñas</TableHead>
              <TableHead className="text-center">Promedio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-6"
                >
                  No hay vendedores en riesgo actualmente.
                </TableCell>
              </TableRow>
            ) : (
              data.map((vendedor) => (
                <TableRow key={vendedor.id}>
                  <TableCell className="text-muted-foreground font-medium">
                    {vendedor.id}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {vendedor.nombre}
                  </TableCell>
                  <TableCell className="text-center">
                    {vendedor.resenas}
                  </TableCell>
                  <TableCell className="text-center font-bold text-red-600">
                    {vendedor.promedio.toFixed(1)} ⭐
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
