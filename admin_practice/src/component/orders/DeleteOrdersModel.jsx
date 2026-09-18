import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../common/Modal";
import { deleteProduct } from "../../services/product.service";
import toast from "react-hot-toast";
import { deleteOrder } from "../../services/orders.services";

const DeleteOrdersModel = ({ isOpen, onClose, order }) => {
  const handleClose = () => {
    onClose();
  };

  //deletion for the mutraion basis
  const queryClient = useQueryClient();

  const deleteOrderMutation = useMutation({
    mutationFn: (orderId) => deleteOrder(orderId),
    onSuccess: async (data) => {
      //this is for to reload the the getAllapi so thatupdate the ui
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(data?.message || "Order Deleted Successfully");

      onClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete product");
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Order"
      description="Are you sure to delete"
      size="md"
    >
      <div className=" min-h-50 border-gray-500 px-5 py-2">
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <div className="flex gap-3">
            {/* Warning Icon */}
            <svg
              className="h-6 w-6 text-red-600 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <div>
              <h2 className="text-lg font-semibold text-red-900 leading-6">
                Delete <span>{order?.name}</span> order?
              </h2>
              <p className="mt-2 text-sm text-red-700">
                This action is permanent and cannot be undone. All associated
                data will be lost.
              </p>
            </div>
          </div>
        </div>
        <div className="my-3 text-md font-semibold">
          {" "}
          <span>To confirm deletion, please Press "DELETE" below.</span>
        </div>
        <div className=" flex justify-around mt-4">
          <button
            className=" w-40 px-4 py-2 rounded-2xl text-amber-50 border bg-gray-400 hover:bg-gray-600 cursor-pointer "
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            disabled={deleteOrderMutation.isPending}
            className=" w-40 px-4 py-2  rounded-2xl text-amber-50 border bg-red-600 hover:bg-red-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
            onClick={() => deleteOrderMutation.mutate(order?._id)}
          >
            {deleteOrderMutation.isPending ? "Deleting......" : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteOrdersModel;
