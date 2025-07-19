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
  }[];
  date: string;
}

export interface Order {
  clientName: String;
  deliveryDetails: string;
  status: String;
  products: Product[];
  fulfillments: Fulfillment[];
}
