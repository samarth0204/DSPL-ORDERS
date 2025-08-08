import * as yup from "yup";

export const orderSchema = yup.object().shape({
  clientName: yup.string().required("Client name is required"),
  deliveryDetails: yup.string().required("Delivery details are required"),
  description: yup.string(),
  products: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Product name is required"),
        size: yup.string().required("Size is required"),
        orderBy: yup.string().required("Order By is required"),
        quantity: yup
          .number()
          .typeError("Quantity is required") // will trigger if empty or not a number
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
        rate: yup.string(),
      })
    )
    .min(1, "Add at least one product"),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").min(8),
});
