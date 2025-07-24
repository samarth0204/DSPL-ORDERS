export interface Bill {
  id: string;
  fulfilledProducts: {
    name: string;
    size: string;
    quantity: number;
    order_by: string;
  }[];
  date: string;
}
