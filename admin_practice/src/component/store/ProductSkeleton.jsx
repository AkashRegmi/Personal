const ProductSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border bg-white">
      <div className="aspect-square bg-gray-200" />

      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 rounded bg-gray-200" />

        <div className="h-4 w-full rounded bg-gray-200" />

        <div className="h-5 w-1/3 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
