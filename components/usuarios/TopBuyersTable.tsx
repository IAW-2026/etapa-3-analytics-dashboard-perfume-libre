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

export function TopBuyersTable({ data }: { data: any[] }) {
  return (
    <Card className="col-span-3 mt-6">
      <CardHeader>
        <CardTitle>Top 10 Compradores (Por Gasto Total)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Posición</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Cant. Órdenes</TableHead>
              <TableHead className="text-right">Gasto Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((usuario, index) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">
                  <Badge variant={index < 3 ? "default" : "secondary"}>
                    #{index + 1}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold">
                  {usuario.nombre}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {usuario.email}
                </TableCell>
                <TableCell className="text-center">{usuario.ordenes}</TableCell>
                <TableCell className="text-right font-bold text-primary">
                  ${usuario.gastado.toLocaleString("es-AR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
