import  { useState } from "react";
import OrderPageHeader from "../component/orders/OrderPageHeaders";
import OrderTable from "../component/orders/OrderTable";
import { useOrderById, useOrders } from "../hooks/useOrders";
import { useDebounce } from "../hooks/useDebounce";
import DeleteOrdersModel from "../component/orders/DeleteOrdersModel";
import AddOrderModel from "../component/orders/AddOrderModel";
import SingleOrderModel from "../component/orders/SingleOrderModel";

const OrdersPage = () => {
  const [searchWord, setSearchWord] = useState("");
  const [isOrderDeleteModelOpen, setOrderDeleteModelOpen] = useState(false);
  const [isAddOrderModelOpen, setAddOrderModelOpen] = useState(false);
  const [isSingleOrderModelOpen, setSingleOrderModelOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const debounceSearchTerm = useDebounce(searchWord, 500);
  const { data, isPending } = useOrders(limit, page, debounceSearchTerm);
  const { data: orderbyId } = useOrderById(selectedOrder?._id);
 
  const currentpage = data?.pagination?.page;
  const handelOnCloseButton = () => {
    setAddOrderModelOpen(false);
    setSelectedOrder(null);
  };
  //for thr delete
  const handelDelete = (order) => {
    setOrderDeleteModelOpen(true);
    setSelectedOrder(order);
  };
  const handelOnCloseDeleteButton = () => {
    setOrderDeleteModelOpen(false);
    setSelectedOrder(null);
  };
  //Adding the Product
  const handalAddProduct = () => {
    setAddOrderModelOpen(true);
  };
  //single model
  const handalOnCloseSingleModel = () => {
    setSingleOrderModelOpen(false);
    setSelectedOrder(null);
  };
  const handelviewbutton = (data) => {
    setSingleOrderModelOpen(true);
    setSelectedOrder(data);
  };
  //
  const handelPageChange = (data) => {
    setPage(data);
  };

  //for search
  const handelSearch = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className=" min-h-full bg-gray-100 p-6">
      <div className=" space-y-6">
        {" "}
        <OrderPageHeader
          onAddProduct={handalAddProduct}
          onSearchProduct={handelSearch}
          orders={data}
        />
        <OrderTable
          orders={data}
          isPending={isPending}
          handelDelete={handelDelete}
          handelviewbutton={handelviewbutton}
          page={currentpage}
          onPageChange={handelPageChange}
        />
        <AddOrderModel
          isOpen={isAddOrderModelOpen}
          onClose={handelOnCloseButton}
        />
        <SingleOrderModel
          isOpen={isSingleOrderModelOpen}
          onClose={handalOnCloseSingleModel}
          order={orderbyId?.order}
        />
        <DeleteOrdersModel
          isOpen={isOrderDeleteModelOpen}
          order={selectedOrder}
          onClose={handelOnCloseDeleteButton}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
