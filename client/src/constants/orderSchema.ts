import * as yup from "yup";

export const orderSchema = yup.object().shape({
  clientName: yup.string().required("Client name is required"),
  deliveryDetails: yup.string().required("Delivery details are required"),
  products: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Product name is required"),
        size: yup.string().required("Size is required"),
        order_by: yup.string().required("Order By is required"),
        quantity: yup.string().required("Quantity is required"),
      })
    )
    .min(1, "Add at least one product"),
});
