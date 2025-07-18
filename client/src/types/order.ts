export interface Product {
  name: string;
  size: string;
  order_by: string;
  quantity: string;
}

export interface Order {
  clientName: String;
  deliveryDetails: string;
  status: String;
  products: Product[];
}
