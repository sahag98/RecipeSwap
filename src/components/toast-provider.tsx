"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        // Define default options
        className: "",
        duration: 3000,
        style: {
          background: "#fff",
          color: "black",
        },
      }}
      position="bottom-right"
    />
  );
};
