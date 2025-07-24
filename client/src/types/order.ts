export interface Product {
  name: string;
  size: string;
  order_by: string;
  quantity: string;
}

interface Fulfillment {
  id: string; // maybe bill ID
  fulfilledProducts: {
    name: string;
    size: string;
    quantity: number;
    order_by: string;
  }[];
  date: string;
}

export interface Order {
  clientName: string; // Changed from String to string
  deliveryDetails: string;
  status: string; // Changed from String to string
  products: Product[];
  fulfillments: Fulfillment[];
  salesManName: string;
  orderDate: string;
}
