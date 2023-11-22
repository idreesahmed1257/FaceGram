import toast, { Toaster } from "react-hot-toast";
import React from "react";
export const SuccessToaster = message => toast.success(message);
export const ErrorToaster = message => toast.error(message);
export const LoadingToaster = message => toast.loading(message);

const MyToaster = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 2000,
            theme: {
              primary: "green"
            }
          },
          loading: {
            duration: 2000,
            theme: {
              primary: "green"
            }
          }
        }}
      />
    </div>
  );
};

export default MyToaster;
