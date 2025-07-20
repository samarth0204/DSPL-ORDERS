import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface FulfilledProduct {
  name: string;
  size: string;
  quantity: string;
}

const BillCard = ({ f }: { f?: any }) => {
  if (!f) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Bill #{f.id}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <Calendar size={18} />
              {f.date}
            </CardDescription>
          </div>
          <div className="text-sm font-semibold text-right text-green-600">
            ₹{f.amount?.toLocaleString() || "0"}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="ml-4 list-disc text-sm text-gray-700">
          {f.fulfilledProducts?.map((p: FulfilledProduct, i: number) => (
            <li key={i}>
              {p.name} - {p.size} : {p.quantity}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="text-xs text-gray-400">
        Total items: {f.fulfilledProducts?.length || 0}
      </CardFooter>
    </Card>
  );
};

export default BillCard;
