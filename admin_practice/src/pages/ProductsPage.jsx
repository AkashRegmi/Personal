import { useState } from "react";
import ProductPageHeader from "../component/products/ProductPageHeader";
import ProductTable from "../component/products/ProductTable";
import AddProductModal from "../component/products/AddProductModal";
import DeleteProductModel from "../component/products/DeleteProductModel";
import { useProducts } from "../hooks/useProducts";
import EditProductModel from "../component/products/EditProductModel";

const ProductsPage = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { data, isPending } = useProducts();
  const handleOpenAddProduct = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCloseAddProduct = () => {
    setIsAddProductModalOpen(false);
  };
  ///Delete case
  const handelDeleteIcon = (product) => {
    setDeleteModelOpen(true);
    setSelectedProduct(product);
  };
  const handelOnCloseButton = () => {
    setDeleteModelOpen(false);
    setSelectedProduct(null);
  };

  //Edit case
  const handalEditIcon = (product) => {
    setEditModalOpen(true);
    setSelectedProduct(product);
  };
  const handleCloseEditProduct = () => {
    setEditModalOpen(false);
  };

  return (
    <div className="min-h-full bg-gray-100 p-6">
      <div className="space-y-6">
        <ProductPageHeader onAddProduct={handleOpenAddProduct} />

        <ProductTable
          apiProducts={data}
          isPending={isPending}
          handelDeleteIcon={handelDeleteIcon}
          handalEditIcon={handalEditIcon}
        />
        <AddProductModal
          isOpen={isAddProductModalOpen}
          onClose={handleCloseAddProduct}
        />
        <EditProductModel
          isOpen={isEditModalOpen}
          onClose={handleCloseEditProduct}
          product={selectedProduct}
        />
        <DeleteProductModel
          isOpen={isDeleteModelOpen}
          onClose={handelOnCloseButton}
          product={selectedProduct}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
