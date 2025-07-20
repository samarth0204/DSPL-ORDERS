export interface Bill {
  id: string;
  fulfilledProducts: { name: string; size: string; quantity: number }[];
  date: string;
}
