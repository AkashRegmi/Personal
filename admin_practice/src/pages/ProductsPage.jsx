import { useState } from "react";

import ProductPageHeader from "../component/products/ProductPageHeader";
import ProductTable from "../component/products/ProductTable";
import AddProductModal from "../component/products/AddProductModal";
import DeleteProductModel from "../component/products/DeleteProductModel";
import { useProducts } from "../hooks/useProducts";
import EditProductModel from "../component/products/EditProductModel";
import SingleProductModel from "../component/products/SingleProductModel";
import { getSingleProduct } from "../services/product.service";

const ProductsPage = () => {
  // Get the ID from the URL parameters
  // const { id } = useParams();
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModelOpen, setViewModelOpen] = useState(false);

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
  // thandelhe isfor the view option
  const handelViewButton = async (productId) => {
    const product = await getSingleProduct(productId?._id);
    setSelectedProduct(product);
    setViewModelOpen(true);
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
          handelViewButton={handelViewButton}
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
        <SingleProductModel
          isOpen={isViewModelOpen}
          onClose={handelOnCloseButton}
          product={selectedProduct}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
