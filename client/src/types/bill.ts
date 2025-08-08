export interface Bill {
  id: string;
  fulfilledProducts: {
    name: string;
    size: string;
    quantity: number;
    orderBy: string;
  }[];
  date: string;
}
