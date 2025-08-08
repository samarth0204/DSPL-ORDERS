export const dummyOrders = [
  {
    id: "order-001", // Added unique order ID
    clientName: "Amit",
    deliveryDetails: "Truck 9821",
    status: "In Progress",
    products: [
      { name: "Mirchi Gold", size: "1 kg", orderBy: "Kg", quantity: "87" },
      { name: "Haldi Gold", size: "500gm", orderBy: "Bag", quantity: "56" },
    ],
    fulfillments: [
      {
        id: "8e3b9c45",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "500gm", quantity: 40, orderBy: "Bag" },
        ],
        date: "2025-07-10",
      },
      {
        id: "8e3b9c46",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "500gm", quantity: 16, orderBy: "Bag" },
        ],
        date: "2025-08-10",
      },
      {
        id: "8e3b9c47",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "1 kg", quantity: 83, orderBy: "Kg" },
        ],
        date: "2025-08-10",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-01",
  },
  {
    id: "order-002", // Added unique order ID
    clientName: "Ravi",
    deliveryDetails: "Van 1032",
    status: "Completed",
    products: [
      { name: "Kasuri Methi", size: "25gm", orderBy: "Pcs", quantity: "99" },
    ],
    fulfillments: [
      {
        id: "r1a2v3i4",
        fulfilledProducts: [
          { name: "Kasuri Methi", size: "25gm", quantity: 99, orderBy: "Pcs" },
        ],
        date: "2025-07-05",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-02",
  },
  {
    id: "order-003", // Added unique order ID
    clientName: "Sunita",
    deliveryDetails: "Tempo 4411",
    status: "Not Started",
    products: [
      { name: "Haldi Gold", size: "100gm", orderBy: "Pcs", quantity: "23" },
      { name: "Kasuri Methi", size: "1 kg", orderBy: "Kg", quantity: "31" },
    ],
    fulfillments: [],
    salesManName: "Priya",
    orderDate: "2025-07-03",
  },
  {
    id: "order-004", // Added unique order ID
    clientName: "Vikash",
    deliveryDetails: "Truck 2278",
    status: "Completed",
    products: [
      { name: "Mirchi Gold", size: "500gm", orderBy: "Bag", quantity: "45" },
    ],
    fulfillments: [
      {
        id: "v5i6k7a8",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "500gm", quantity: 45, orderBy: "Bag" },
        ],
        date: "2025-07-12",
      },
    ],
    salesManName: "Rajesh",
    orderDate: "2025-07-04",
  },
  {
    id: "order-005", // Added unique order ID
    clientName: "Ramesh",
    deliveryDetails: "Van 6223",
    status: "In Progress",
    products: [
      { name: "Haldi Gold", size: "1 kg", orderBy: "Kg", quantity: "72" },
    ],
    fulfillments: [
      {
        id: "r9a0m1e2",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "1 kg", quantity: 50, orderBy: "Kg" },
        ],
        date: "2025-07-08",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-05",
  },
  {
    id: "order-006", // Added unique order ID
    clientName: "Pooja",
    deliveryDetails: "Tempo 4475",
    status: "Not Started",
    products: [
      { name: "Kasuri Methi", size: "200gm", orderBy: "Bag", quantity: "50" },
      { name: "Haldi Gold", size: "25gm", orderBy: "Pcs", quantity: "14" },
    ],
    fulfillments: [],
    salesManName: "Priya",
    orderDate: "2025-07-06",
  },
  {
    id: "order-007", // Added unique order ID
    clientName: "Deepak",
    deliveryDetails: "Truck 5987",
    status: "Completed",
    products: [
      { name: "Mirchi Gold", size: "100gm", orderBy: "Kg", quantity: "76" },
    ],
    fulfillments: [
      {
        id: "d3e4e5p6",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "100gm", quantity: 76, orderBy: "Kg" },
        ],
        date: "2025-07-15",
      },
    ],
    salesManName: "Rajesh",
    orderDate: "2025-07-07",
  },
  {
    id: "order-008", // Added unique order ID
    clientName: "Meena",
    deliveryDetails: "Van 7193",
    status: "In Progress",
    products: [
      { name: "Kasuri Methi", size: "500gm", orderBy: "Pcs", quantity: "11" },
    ],
    fulfillments: [
      {
        id: "m7e8e9n0",
        fulfilledProducts: [
          { name: "Kasuri Methi", size: "500gm", quantity: 5, orderBy: "Pcs" },
        ],
        date: "2025-07-09",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-08",
  },
  {
    id: "order-009", // Added unique order ID
    clientName: "Suresh",
    deliveryDetails: "Tempo 3009",
    status: "In Progress",
    products: [
      { name: "Haldi Gold", size: "1 kg", orderBy: "Kg", quantity: "61" },
      { name: "Mirchi Gold", size: "25gm", orderBy: "Bag", quantity: "89" },
    ],
    fulfillments: [
      {
        id: "s1u2r3e4",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "1 kg", quantity: 30, orderBy: "Kg" },
          { name: "Mirchi Gold", size: "25gm", quantity: 40, orderBy: "Bag" },
        ],
        date: "2025-07-11",
      },
    ],
    salesManName: "Priya",
    orderDate: "2025-07-09",
  },
  {
    id: "order-010", // Added unique order ID
    clientName: "Neha",
    deliveryDetails: "Truck 1602",
    status: "Not Started",
    products: [
      { name: "Mirchi Gold", size: "500gm", orderBy: "Kg", quantity: "34" },
    ],
    fulfillments: [],
    salesManName: "Rajesh",
    orderDate: "2025-07-10",
  },
  {
    id: "order-011", // Added unique order ID
    clientName: "Asha",
    deliveryDetails: "Van 5894",
    status: "Completed",
    products: [
      { name: "Kasuri Methi", size: "200gm", orderBy: "Bag", quantity: "66" },
    ],
    fulfillments: [
      {
        id: "a5s6h7a8",
        fulfilledProducts: [
          {
            name: "Kasuri Methi",
            size: "200gm",
            quantity: 66,
            orderBy: "Bag",
          },
        ],
        date: "2025-07-13",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-11",
  },
  {
    id: "order-012", // Added unique order ID
    clientName: "Sandeep",
    deliveryDetails: "Tempo 9802",
    status: "In Progress",
    products: [
      { name: "Haldi Gold", size: "100gm", orderBy: "Pcs", quantity: "17" },
      { name: "Mirchi Gold", size: "1 kg", orderBy: "Bag", quantity: "90" },
    ],
    fulfillments: [
      {
        id: "s9a0n1d2",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "100gm", quantity: 10, orderBy: "Pcs" },
          { name: "Mirchi Gold", size: "1 kg", quantity: 50, orderBy: "Bag" },
        ],
        date: "2025-07-07",
      },
      {
        id: "s9a0n1d3",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "1 kg", quantity: 40, orderBy: "Bag" },
        ],
        date: "2025-07-14",
      },
    ],
    salesManName: "Priya",
    orderDate: "2025-07-12",
  },
  {
    id: "order-013", // Added unique order ID
    clientName: "Tina",
    deliveryDetails: "Truck 4499",
    status: "Not Started",
    products: [
      { name: "Kasuri Methi", size: "25gm", orderBy: "Pcs", quantity: "12" },
    ],
    fulfillments: [],
    salesManName: "Rajesh",
    orderDate: "2025-07-13",
  },
  {
    id: "order-014", // Added unique order ID
    clientName: "Rohit",
    deliveryDetails: "Van 3343",
    status: "Completed",
    products: [
      { name: "Haldi Gold", size: "200gm", orderBy: "Bag", quantity: "44" },
    ],
    fulfillments: [
      {
        id: "r3o4h5i6",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "200gm", quantity: 44, orderBy: "Bag" },
        ],
        date: "2025-07-16",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-14",
  },
  {
    id: "order-015", // Added unique order ID
    clientName: "Komal",
    deliveryDetails: "Tempo 7731",
    status: "In Progress",
    products: [
      { name: "Mirchi Gold", size: "100gm", orderBy: "Kg", quantity: "53" },
    ],
    fulfillments: [
      {
        id: "k7o8m9a0",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "100gm", quantity: 30, orderBy: "Kg" },
        ],
        date: "2025-07-06",
      },
    ],
    salesManName: "Priya",
    orderDate: "2025-07-15",
  },
  {
    id: "order-016", // Added unique order ID
    clientName: "Ajay",
    deliveryDetails: "Truck 8452",
    status: "Completed",
    products: [
      { name: "Kasuri Methi", size: "1 kg", orderBy: "Kg", quantity: "39" },
      { name: "Haldi Gold", size: "500gm", orderBy: "Pcs", quantity: "22" },
    ],
    fulfillments: [
      {
        id: "a1j2a3y4",
        fulfilledProducts: [
          { name: "Kasuri Methi", size: "1 kg", quantity: 39, orderBy: "Kg" },
          { name: "Haldi Gold", size: "500gm", quantity: 22, orderBy: "Pcs" },
        ],
        date: "2025-07-17",
      },
    ],
    salesManName: "Rajesh",
    orderDate: "2025-07-16",
  },
  {
    id: "order-017", // Added unique order ID
    clientName: "Lata",
    deliveryDetails: "Van 1344",
    status: "Not Started",
    products: [
      { name: "Mirchi Gold", size: "200gm", orderBy: "Bag", quantity: "68" },
    ],
    fulfillments: [],
    salesManName: "Akash",
    orderDate: "2025-07-17",
  },
  {
    id: "order-018", // Added unique order ID
    clientName: "Karan",
    deliveryDetails: "Tempo 7821",
    status: "Completed",
    products: [
      { name: "Haldi Gold", size: "1 kg", orderBy: "Kg", quantity: "29" },
    ],
    fulfillments: [
      {
        id: "k5a6r7a8",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "1 kg", quantity: 29, orderBy: "Kg" },
        ],
        date: "2025-07-18",
      },
    ],
    salesManName: "Priya",
    orderDate: "2025-07-18",
  },
  {
    id: "order-019", // Added unique order ID
    clientName: "Sneha",
    deliveryDetails: "Truck 9123",
    status: "In Progress",
    products: [
      { name: "Kasuri Methi", size: "500gm", orderBy: "Bag", quantity: "99" },
    ],
    fulfillments: [
      {
        id: "s9n0e1h2",
        fulfilledProducts: [
          {
            name: "Kasuri Methi",
            size: "500gm",
            quantity: 70,
            orderBy: "Bag",
          },
        ],
        date: "2025-07-04",
      },
    ],
    salesManName: "Rajesh",
    orderDate: "2025-07-19",
  },
  {
    id: "order-020", // Added unique order ID
    clientName: "Mohit",
    deliveryDetails: "Van 6754",
    status: "Not Started",
    products: [
      { name: "Haldi Gold", size: "100gm", orderBy: "Pcs", quantity: "37" },
    ],
    fulfillments: [],
    salesManName: "Akash",
    orderDate: "2025-07-20",
  },
];

export const dummyFulfillments = [
  {
    id: "8e3b9c45",
    fulfilledProducts: [
      { name: "Haldi Gold", size: "500gm", quantity: 40, orderBy: "Bag" },
    ],
    date: "2025-07-10",
    orderId: "order-001",
    amount: 1250.0,
    status: "Paid",
  },
  {
    id: "8e3b9c46",
    fulfilledProducts: [
      { name: "Haldi Gold", size: "500gm", quantity: 16, orderBy: "Bag" },
    ],
    date: "2025-08-10",
    orderId: "order-001",
    amount: 580.5,
    status: "Pending",
  },
  {
    id: "8e3b9c47",
    fulfilledProducts: [
      { name: "Mirchi Gold", size: "1 kg", quantity: 83, orderBy: "Kg" },
    ],
    date: "2025-08-10",
    orderId: "order-001",
    amount: 3200.75,
    status: "Paid",
  },
  {
    id: "r1a2v3i4",
    fulfilledProducts: [
      { name: "Kasuri Methi", size: "25gm", quantity: 99, orderBy: "Pcs" },
    ],
    date: "2025-07-05",
    orderId: "order-002",
    amount: 890.0,
    status: "Paid",
  },
  {
    id: "v5i6k7a8",
    fulfilledProducts: [
      { name: "Mirchi Gold", size: "500gm", quantity: 45, orderBy: "Bag" },
    ],
    date: "2025-07-12",
    orderId: "order-004",
    amount: 1550.25,
    status: "Pending",
  },
  {
    id: "r9a0m1e2",
    fulfilledProducts: [
      { name: "Haldi Gold", size: "1 kg", quantity: 50, orderBy: "Kg" },
    ],
    date: "2025-07-08",
    orderId: "order-005",
    amount: 1800.0,
    status: "Paid",
  },
  {
    id: "d3e4e5p6",
    fulfilledProducts: [
      { name: "Mirchi Gold", size: "100gm", quantity: 76, orderBy: "Kg" },
    ],
    date: "2025-07-15",
    orderId: "order-007",
    amount: 2100.0,
    status: "Paid",
  },
  {
    id: "m7e8e9n0",
    fulfilledProducts: [
      { name: "Kasuri Methi", size: "500gm", quantity: 5, orderBy: "Pcs" },
    ],
    date: "2025-07-09",
    orderId: "order-008",
    amount: 150.0,
    status: "Pending",
  },
  {
    id: "s1u2r3e4",
    fulfilledProducts: [
      { name: "Haldi Gold", size: "1 kg", quantity: 30, orderBy: "Kg" },
      { name: "Mirchi Gold", size: "25gm", quantity: 40, orderBy: "Bag" },
    ],
    date: "2025-07-11",
    orderId: "order-009",
    amount: 2500.0,
    status: "Paid",
  },
  {
    id: "a5s6h7a8",
    fulfilledProducts: [
      { name: "Kasuri Methi", size: "200gm", quantity: 66, orderBy: "Bag" },
    ],
    date: "2025-07-13",
    orderId: "order-011",
    amount: 1980.0,
    status: "Paid",
  },
  {
    id: "s9a0n1d2",
    fulfilledProducts: [
      { name: "Haldi Gold", size: "100gm", quantity: 10, orderBy: "Pcs" },
      { name: "Mirchi Gold", size: "1 kg", quantity: 50, orderBy: "Bag" },
    ],
    date: "2025-07-07",
    orderId: "order-012",
    amount: 2200.0,
    status: "Pending",
  },
  {
    id: "s9a0n1d3",
    fulfilledProducts: [
      { name: "Mirchi Gold", size: "1 kg", quantity: 40, orderBy: "Bag" },
    ],
    date: "2025-07-14",
    orderId: "order-012",
    amount: 1500.0,
    status: "Paid",
  },
  {
    id: "r3o4h5i6",
    fulfilledProducts: [
      { name: "Haldi Gold", size: "200gm", quantity: 44, orderBy: "Bag" },
    ],
    date: "2025-07-16",
    orderId: "order-014",
    amount: 1600.0,
    status: "Paid",
  },
  {
    id: "k7o8m9a0",
    fulfilledProducts: [
      { name: "Mirchi Gold", size: "100gm", quantity: 30, orderBy: "Kg" },
    ],
    date: "2025-07-06",
    orderId: "order-015",
    amount: 950.0,
    status: "Pending",
  },
  {
    id: "a1j2a3y4",
    fulfilledProducts: [
      { name: "Kasuri Methi", size: "1 kg", quantity: 39, orderBy: "Kg" },
      { name: "Haldi Gold", size: "500gm", quantity: 22, orderBy: "Pcs" },
    ],
    date: "2025-07-17",
    orderId: "order-016",
    amount: 2800.0,
    status: "Paid",
  },
  {
    id: "k5a6r7a8",
    fulfilledProducts: [
      { name: "Haldi Gold", size: "1 kg", quantity: 29, orderBy: "Kg" },
    ],
    date: "2025-07-18",
    orderId: "order-018",
    amount: 1100.0,
    status: "Paid",
  },
  {
    id: "s9n0e1h2",
    fulfilledProducts: [
      { name: "Kasuri Methi", size: "500gm", quantity: 70, orderBy: "Bag" },
    ],
    date: "2025-07-04",
    orderId: "order-019",
    amount: 2100.0,
    status: "Pending",
  },
];
