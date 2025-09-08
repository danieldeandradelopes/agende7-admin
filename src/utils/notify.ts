import { toast } from "react-toastify";

function showNotification(message: string) {
  toast.info(message);
}

export default showNotification;
