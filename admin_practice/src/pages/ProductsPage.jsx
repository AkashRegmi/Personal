import { useState } from "react";

import ProductPageHeader from "../component/products/ProductPageHeader";
import ProductTable from "../component/products/ProductTable";
import AddProductModal from "../component/products/AddProductModal";
import DeleteProductModel from "../component/products/DeleteProductModel";
import { useExportProducts, useProducts } from "../hooks/useProducts";
import EditProductModel from "../component/products/EditProductModel";
import SingleProductModel from "../component/products/SingleProductModel";
import { getSingleProduct } from "../services/product.service";
import { useDebounce } from "../hooks/useDebounce";
import toast from "react-hot-toast";

const ProductsPage = () => {
  // Get the ID from the URL parameters
  // const { id } = useParams();
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModelOpen, setViewModelOpen] = useState(false);
  const [searchWord, setSearchedWord] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const debounceSearchTerm = useDebounce(searchWord, 500);
  const { data, isPending } = useProducts(debounceSearchTerm, page, limit);
  const { mutate: exportProducts, isPending: isExporting } =
    useExportProducts();

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
  //hanndel the Search one
  const handleSearchWord = (e) => {
    setSearchedWord(e.target.value);
  };

  //handel export one
  const handleExport = () => {
    exportProducts(
      {},
      {
        onSuccess: (response) => {
          const blob = response.data;
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = "products.xlsx";

          document.body.appendChild(link);
          link.click();

          link.remove();

          window.URL.revokeObjectURL(url);
          toast.success("Export Successfullly");
        },

        onError: (error) => {
          toast.error(`${error.response.message}` || "Export Failed ");
        },
      },
    );
  };
  //for the pagination

  const currentPage = data?.pagination?.page;
  const handelOnPagechange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-full bg-gray-100 p-6">
      <div className="space-y-6">
        <ProductPageHeader
          apiProducts={data}
          onAddProduct={handleOpenAddProduct}
          onSearchProduct={handleSearchWord}
          handleExport={handleExport}
          isExporting={isExporting}
  
        />

        <ProductTable
          apiProducts={data}
          isPending={isPending}
          handelDeleteIcon={handelDeleteIcon}
          handalEditIcon={handalEditIcon}
          handelViewButton={handelViewButton}
          page={currentPage}
          onPageChange={handelOnPagechange}
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
