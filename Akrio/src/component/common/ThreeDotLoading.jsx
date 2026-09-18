const Loading = ({
  text = "Loading...",
  size = "md",
  color = "bg-[#293354]",
  gap = "gap-2",
}) => {
  const sizes = {
    sm: {
      dot: "h-1.5 w-1.5",
      text: "text-sm",
    },
    md: {
      dot: "h-2 w-2",
      text: "text-base",
    },
    lg: {
      dot: "h-4.5 w-4.5",
      text: "text-lg",
    },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div>
      <div className={`flex items-center justify-center ${gap}`}>
        <div className="flex items-center gap-1">
          <span
            className={`${currentSize.dot} ${color} animate-bounce rounded-full`}
          />
          <span
            className={`${currentSize.dot} ${color} animate-bounce rounded-full [animation-delay:150ms]`}
          />
          <span
            className={`${currentSize.dot} ${color} animate-bounce rounded-full [animation-delay:300ms]`}
          />
        </div>
      </div>
      <p className={`font-medium text-gray-600 mt-3 ${currentSize.text}`}>
        {text}
      </p>
    </div>
  );
};

export default Loading;
