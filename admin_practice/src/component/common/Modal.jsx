import { X } from "lucide-react";
const Modal = ({
  onClose,
  isOpen,
  title,
  children,
  description,
  size = "md",
}) => {
  if (!isOpen) return null;
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        className={`w-full ${sizeClasses[size]} overflow-hidden rounded-2xl bg-white shadow-2xl`}
      >
        {" "}
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>

            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>
        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
