import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Pencil, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface FulfilledProduct {
  name: string;
  size: string;
  quantity: string;
  orderBy: string;
}

const BillCard = ({ fulfillment }: { fulfillment?: any }) => {
  if (!fulfillment) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Bill #{fulfillment.id}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <Calendar size={18} />
              {fulfillment.date}
            </CardDescription>
          </div>
          <div className="text-sm font-semibold text-right text-green-600 flex flex-col gap-1 items-end">
            ₹{fulfillment.amount?.toLocaleString() || "0"}
            <Badge
              variant={
                fulfillment.status === "PAID" ? "secondary" : "destructive"
              }
              className={cn(
                fulfillment.status === "PAID" &&
                  "bg-green-700 text-white dark:bg-blue-600"
              )}
            >
              {fulfillment.status === "PAID" ? "Paid" : "Pending"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="ml-4 list-disc text-sm text-gray-700">
          {fulfillment.fulfilledProducts?.map(
            (p: FulfilledProduct, i: number) => (
              <li key={i}>
                {p.name} - {p.size} : {p.quantity} {p.orderBy}
              </li>
            )
          )}
        </ul>
      </CardContent>

      <CardFooter className="flex justify-between">
        <p className="text-xs text-gray-400">
          Total items: {fulfillment.fulfilledProducts?.length || 0}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {}}>
            <Pencil size={18} />
            Edit
          </Button>

          <Button
            variant="destructive"
            className="bg-white text-black hover:text-white"
            onClick={() => {}}
          >
            <Trash size={18} />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BillCard;
