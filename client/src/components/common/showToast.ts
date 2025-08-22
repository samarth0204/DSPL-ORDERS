import { toast } from "react-toastify";

export const showToast = {
  success: (msg: string) =>
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
    }),
  error: (msg: string) =>
    toast.error(msg, { hideProgressBar: true, closeOnClick: true }),
};
