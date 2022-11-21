import { toast } from "material-react-toastify";

const opts = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const successNotification = (msg) => toast.success(msg, opts);

export const errorNotification = (msg) => toast.error(msg, opts);

export const warningNotification = (msg) => toast.warning(msg, opts);

export const infoNotification = (msg) => toast.info(msg, opts);

export const darkNotification = (msg) => toast.dark(msg, opts);
