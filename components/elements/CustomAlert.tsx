import toast, { Toaster } from "react-hot-toast";

type Props = {
  type: "success" | "error";
  message: string;
};

export const CustomToast = (props: Props) => {
  toast[props.type](props.message);
};
