import { toast } from "react-toastify";
const TOAST_CONFIG = {
  position: "top-right" as const,
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export const showToast = {
  success: (msg: string) => toast.success(msg, TOAST_CONFIG),
  error: (msg: string) => toast.error(msg, TOAST_CONFIG),
};
