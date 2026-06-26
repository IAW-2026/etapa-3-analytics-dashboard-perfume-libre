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

export function CatalogTable({ data }: { data: any[] }) {
  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "activo":
        return "default";
      case "pausado":
        return "secondary";
      case "borrado":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="col-span-3 mt-6">
      <CardHeader>
        <CardTitle>Últimos Productos Publicados</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead className="text-center">Stock Disponible</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((prod) => (
              <TableRow key={prod.producto_id}>
                <TableCell className="text-muted-foreground font-medium">
                  #{prod.producto_id}
                </TableCell>
                <TableCell className="font-semibold">{prod.titulo}</TableCell>
                <TableCell className="text-center">{prod.stock}</TableCell>
                <TableCell>
                  <Badge variant={getEstadoBadge(prod.estado)}>
                    {prod.estado.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-bold text-primary">
                  ${prod.precio.toLocaleString("es-AR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
