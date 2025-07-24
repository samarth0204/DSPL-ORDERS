export const dummyOrders = [
  {
    clientName: "Amit",
    deliveryDetails: "Truck 9821",
    status: "In Progress",
    products: [
      { name: "Mirchi Gold", size: "1 kg", order_by: "Kg", quantity: "87" },
      { name: "Haldi Gold", size: "500gm", order_by: "Bag", quantity: "56" },
    ],
    fulfillments: [
      {
        id: "8e3b9c45",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "500gm", quantity: 40, order_by: "Bag" }, // Added order_by
        ],
        date: "2025-07-10",
      },
      {
        id: "8e3b9c46",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "500gm", quantity: 16, order_by: "Bag" }, // Added order_by
        ],
        date: "2025-08-10",
      },
      {
        id: "8e3b9c47",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "1 kg", quantity: 83, order_by: "Kg" }, // Added order_by
        ],
        date: "2025-08-10",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-01",
  },
  {
    clientName: "Ravi",
    deliveryDetails: "Van 1032",
    status: "Completed",
    products: [
      { name: "Kasuri Methi", size: "25gm", order_by: "Pcs", quantity: "99" },
    ],
    fulfillments: [
      {
        id: "r1a2v3i4",
        fulfilledProducts: [
          { name: "Kasuri Methi", size: "25gm", quantity: 99, order_by: "Pcs" }, // Added order_by
        ],
        date: "2025-07-05",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-02",
  },
  {
    clientName: "Sunita",
    deliveryDetails: "Tempo 4411",
    status: "Not Started",
    products: [
      { name: "Haldi Gold", size: "100gm", order_by: "Pcs", quantity: "23" },
      { name: "Kasuri Methi", size: "1 kg", order_by: "Kg", quantity: "31" },
    ],
    fulfillments: [], // No fulfillments yet as status is "Not Started"
    salesManName: "Priya",
    orderDate: "2025-07-03",
  },
  {
    clientName: "Vikash",
    deliveryDetails: "Truck 2278",
    status: "Completed",
    products: [
      { name: "Mirchi Gold", size: "500gm", order_by: "Bag", quantity: "45" },
    ],
    fulfillments: [
      {
        id: "v5i6k7a8",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "500gm", quantity: 45, order_by: "Bag" }, // Added order_by
        ],
        date: "2025-07-12",
      },
    ],
    salesManName: "Rajesh",
    orderDate: "2025-07-04",
  },
  {
    clientName: "Ramesh",
    deliveryDetails: "Van 6223",
    status: "In Progress",
    products: [
      { name: "Haldi Gold", size: "1 kg", order_by: "Kg", quantity: "72" },
    ],
    fulfillments: [
      {
        id: "r9a0m1e2",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "1 kg", quantity: 50, order_by: "Kg" },
        ], // Added order_by
        date: "2025-07-08",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-05",
  },
  {
    clientName: "Pooja",
    deliveryDetails: "Tempo 4475",
    status: "Not Started",
    products: [
      { name: "Kasuri Methi", size: "200gm", order_by: "Bag", quantity: "50" },
      { name: "Haldi Gold", size: "25gm", order_by: "Pcs", quantity: "14" },
    ],
    fulfillments: [],
    salesManName: "Priya",
    orderDate: "2025-07-06",
  },
  {
    clientName: "Deepak",
    deliveryDetails: "Truck 5987",
    status: "Completed",
    products: [
      { name: "Mirchi Gold", size: "100gm", order_by: "Kg", quantity: "76" },
    ],
    fulfillments: [
      {
        id: "d3e4e5p6",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "100gm", quantity: 76, order_by: "Kg" }, // Added order_by
        ],
        date: "2025-07-15",
      },
    ],
    salesManName: "Rajesh",
    orderDate: "2025-07-07",
  },
  {
    clientName: "Meena",
    deliveryDetails: "Van 7193",
    status: "In Progress",
    products: [
      { name: "Kasuri Methi", size: "500gm", order_by: "Pcs", quantity: "11" },
    ],
    fulfillments: [
      {
        id: "m7e8e9n0",
        fulfilledProducts: [
          { name: "Kasuri Methi", size: "500gm", quantity: 5, order_by: "Pcs" }, // Added order_by
        ],
        date: "2025-07-09",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-08",
  },
  {
    clientName: "Suresh",
    deliveryDetails: "Tempo 3009",
    status: "In Progress",
    products: [
      { name: "Haldi Gold", size: "1 kg", order_by: "Kg", quantity: "61" },
      { name: "Mirchi Gold", size: "25gm", order_by: "Bag", quantity: "89" },
    ],
    fulfillments: [
      {
        id: "s1u2r3e4",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "1 kg", quantity: 30, order_by: "Kg" }, // Added order_by
          { name: "Mirchi Gold", size: "25gm", quantity: 40, order_by: "Bag" }, // Added order_by
        ],
        date: "2025-07-11",
      },
    ],
    salesManName: "Priya",
    orderDate: "2025-07-09",
  },
  {
    clientName: "Neha",
    deliveryDetails: "Truck 1602",
    status: "Not Started",
    products: [
      { name: "Mirchi Gold", size: "500gm", order_by: "Kg", quantity: "34" },
    ],
    fulfillments: [],
    salesManName: "Rajesh",
    orderDate: "2025-07-10",
  },
  {
    clientName: "Asha",
    deliveryDetails: "Van 5894",
    status: "Completed",
    products: [
      { name: "Kasuri Methi", size: "200gm", order_by: "Bag", quantity: "66" },
    ],
    fulfillments: [
      {
        id: "a5s6h7a8",
        fulfilledProducts: [
          {
            name: "Kasuri Methi",
            size: "200gm",
            quantity: 66,
            order_by: "Bag",
          }, // Added order_by
        ],
        date: "2025-07-13",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-11",
  },
  {
    clientName: "Sandeep",
    deliveryDetails: "Tempo 9802",
    status: "In Progress",
    products: [
      { name: "Haldi Gold", size: "100gm", order_by: "Pcs", quantity: "17" },
      { name: "Mirchi Gold", size: "1 kg", order_by: "Bag", quantity: "90" },
    ],
    fulfillments: [
      {
        id: "s9a0n1d2",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "100gm", quantity: 10, order_by: "Pcs" }, // Added order_by
          { name: "Mirchi Gold", size: "1 kg", quantity: 50, order_by: "Bag" }, // Added order_by
        ],
        date: "2025-07-07",
      },
      {
        id: "s9a0n1d3",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "1 kg", quantity: 40, order_by: "Bag" }, // Added order_by
        ],
        date: "2025-07-14",
      },
    ],
    salesManName: "Priya",
    orderDate: "2025-07-12",
  },
  {
    clientName: "Tina",
    deliveryDetails: "Truck 4499",
    status: "Not Started",
    products: [
      { name: "Kasuri Methi", size: "25gm", order_by: "Pcs", quantity: "12" },
    ],
    fulfillments: [],
    salesManName: "Rajesh",
    orderDate: "2025-07-13",
  },
  {
    clientName: "Rohit",
    deliveryDetails: "Van 3343",
    status: "Completed",
    products: [
      { name: "Haldi Gold", size: "200gm", order_by: "Bag", quantity: "44" },
    ],
    fulfillments: [
      {
        id: "r3o4h5i6",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "200gm", quantity: 44, order_by: "Bag" }, // Added order_by
        ],
        date: "2025-07-16",
      },
    ],
    salesManName: "Akash",
    orderDate: "2025-07-14",
  },
  {
    clientName: "Komal",
    deliveryDetails: "Tempo 7731",
    status: "In Progress",
    products: [
      { name: "Mirchi Gold", size: "100gm", order_by: "Kg", quantity: "53" },
    ],
    fulfillments: [
      {
        id: "k7o8m9a0",
        fulfilledProducts: [
          { name: "Mirchi Gold", size: "100gm", quantity: 30, order_by: "Kg" }, // Added order_by
        ],
        date: "2025-07-06",
      },
    ],
    salesManName: "Priya",
    orderDate: "2025-07-15",
  },
  {
    clientName: "Ajay",
    deliveryDetails: "Truck 8452",
    status: "Completed",
    products: [
      { name: "Kasuri Methi", size: "1 kg", order_by: "Kg", quantity: "39" },
      { name: "Haldi Gold", size: "500gm", order_by: "Pcs", quantity: "22" },
    ],
    fulfillments: [
      {
        id: "a1j2a3y4",
        fulfilledProducts: [
          { name: "Kasuri Methi", size: "1 kg", quantity: 39, order_by: "Kg" }, // Added order_by
          { name: "Haldi Gold", size: "500gm", quantity: 22, order_by: "Pcs" }, // Added order_by
        ],
        date: "2025-07-17",
      },
    ],
    salesManName: "Rajesh",
    orderDate: "2025-07-16",
  },
  {
    clientName: "Lata",
    deliveryDetails: "Van 1344",
    status: "Not Started",
    products: [
      { name: "Mirchi Gold", size: "200gm", order_by: "Bag", quantity: "68" },
    ],
    fulfillments: [],
    salesManName: "Akash",
    orderDate: "2025-07-17",
  },
  {
    clientName: "Karan",
    deliveryDetails: "Tempo 7821",
    status: "Completed",
    products: [
      { name: "Haldi Gold", size: "1 kg", order_by: "Kg", quantity: "29" },
    ],
    fulfillments: [
      {
        id: "k5a6r7a8",
        fulfilledProducts: [
          { name: "Haldi Gold", size: "1 kg", quantity: 29, order_by: "Kg" },
        ], // Added order_by
        date: "2025-07-18",
      },
    ],
    salesManName: "Priya",
    orderDate: "2025-07-18",
  },
  {
    clientName: "Sneha",
    deliveryDetails: "Truck 9123",
    status: "In Progress",
    products: [
      { name: "Kasuri Methi", size: "500gm", order_by: "Bag", quantity: "99" },
    ],
    fulfillments: [
      {
        id: "s9n0e1h2",
        fulfilledProducts: [
          {
            name: "Kasuri Methi",
            size: "500gm",
            quantity: 70,
            order_by: "Bag",
          }, // Added order_by
        ],
        date: "2025-07-04",
      },
    ],
    salesManName: "Rajesh",
    orderDate: "2025-07-19",
  },
  {
    clientName: "Mohit",
    deliveryDetails: "Van 6754",
    status: "Not Started",
    products: [
      { name: "Haldi Gold", size: "100gm", order_by: "Pcs", quantity: "37" },
    ],
    fulfillments: [],
    salesManName: "Akash",
    orderDate: "2025-07-20",
  },
];
