export interface Product {
  name: string;
  size: string;
  orderBy: string;
  quantity: string;
  rate?: string;
  id?: string;
}

interface Fulfillment {
  id: string; // maybe bill ID
  fulfilledProducts: {
    name: string;
    size: string;
    quantity: number;
    orderBy: string;
    id: string;
  }[];
  date: string;
}

export interface Order {
  id: string;
  clientName: string; // Changed from String to string
  deliveryDetails: string;
  description?: string;
  status: string; // Changed from String to string
  products: Product[];
  fulfillments: Fulfillment[];
  salesManName: string;
  orderDate: string;
}

export type UseFetchOrdersParams = {
  groupBy?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  filterStatus?: string;
  salesmanId?: any;
};
