import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { Order } from "@/types/order";
// import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import {
  Activity,
  BadgeCheck,
  Clock,
  Pencil,
  Trash,
  Truck,
} from "lucide-react";

const OrderTable = ({ order }: { order: Order }) => {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Order By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.products.map((product, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.size}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell className="text-right">{product.order_by}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter> */}
    </Table>
  );
};

const OrderAccordion = ({ order }: { order: Order }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Products</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <OrderTable order={order} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
const GetBadge = ({ order }: { order: Order }) => {
  if (order.status === "Completed") {
    return (
      <Badge
        variant="secondary"
        className="bg-green-700 text-white dark:bg-blue-600"
      >
        <BadgeCheck />
        Completed
      </Badge>
    );
  }
  if (order.status === "In Progress") {
    return (
      <Badge
        variant="secondary"
        className="bg-green-700 text-white dark:bg-blue-600"
      >
        <Clock />
        In Progress
      </Badge>
    );
  }
  return <Badge variant="destructive">Not Started</Badge>;
};
const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>{order.clientName}</CardTitle>
        <CardDescription className="flex gap-2">
          <Truck />
          {order.deliveryDetails}
        </CardDescription>
        <CardAction>
          <GetBadge order={order} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <OrderAccordion order={order} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="default" className="gap-2">
          <Activity />
          See Progress
        </Button>
        <Button variant="outline" className="gap-2">
          <Pencil />
          Edit
        </Button>
        <Button variant="destructive" className="gap-2">
          <Trash />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
