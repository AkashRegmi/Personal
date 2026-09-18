import { LogOut, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          onClick={onCancel}
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <LogOut className="text-red-600" size={22} />
        </div>

        {/* Content */}
        <h2 className="mb-2 text-xl font-bold text-gray-800">Confirm Logout</h2>

        <p className="mb-6 text-sm leading-6 text-gray-500">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
