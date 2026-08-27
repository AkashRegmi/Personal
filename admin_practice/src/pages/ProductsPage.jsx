import { useState } from "react";
import ProductPageHeader from "../component/products/ProductPageHeader";
import ProductTable from "../component/products/ProductTable";
import AddProductModal from "../component/products/AddProductModal";

const ProductsPage = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleOpenAddProduct = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCloseAddProduct = () => {
    setIsAddProductModalOpen(false);
  };
  return (
    <div className="min-h-full bg-gray-100 p-6">
      <div className="space-y-6">
        <ProductPageHeader onAddProduct={handleOpenAddProduct} />

        <ProductTable />
        <AddProductModal
          isOpen={isAddProductModalOpen}
          onClose={handleCloseAddProduct}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
