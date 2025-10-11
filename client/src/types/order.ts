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
  billNumber?: string;
  fulfilledProducts: {
    name: string;
    size: string;
    quantity: number;
    orderBy: string;
    id: string;
    productId: string;
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
  salesmanId?: string;
  salesman: {
    id: string;
    username: string;
  };
  orderDate: string;
  createdAt?: string;
}

export type UseFetchOrdersParams = {
  groupBy?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  filterStatus?: string;
  salesmanId?: any;
  status?: string;
  enabled?: boolean;
};
