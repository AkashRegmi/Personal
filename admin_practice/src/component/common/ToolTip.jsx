const Tooltip = ({ children, text }) => {
  return (
    <div className="group relative flex">
      {children}

      <span
        className="
          pointer-events-none
          absolute left-full top-1/2 z-50
          ml-3
          -translate-y-1/2
          whitespace-nowrap
          rounded-md
          bg-gray-900
          px-3 py-2
          text-xs font-medium text-white
          opacity-0
          shadow-lg
          transition-all duration-200
          group-hover:translate-x-1
          group-hover:opacity-100
        "
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
