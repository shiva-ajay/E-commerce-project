import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log("Component mounted. Seller:", seller);
    if (seller && seller._id) {
      console.log("Fetching products for seller:", seller._id);
      dispatch(getAllProductsShop(seller._id));
    } else {
      console.log("Seller ID not available yet");
    }
  }, [dispatch, seller]);

  useEffect(() => {
    console.log("Products updated:", products);
    if (products && products.length > 0) {
      const newRows = products.map((item) => ({
        id: item._id,
        name: item.name,
        price: `US$ ${item.discountPrice}`,
        Stock: item.stock,
        sold: item.sold_out || 0,
      }));
      console.log("New rows created:", newRows);
      setRows(newRows);
    } else {
      console.log("No products available");
      setRows([]);
    }
  }, [products]);

  const handleDelete = (id) => {
    console.log("Deleting product:", id);
    dispatch(deleteProduct(id));
    window.location.reload();
    dispatch(getAllProductsShop(seller._id));
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/product/${params.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  console.log("Rendering component. Is loading:", isLoading, "Row count:", rows.length);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            autoHeight
            getRowId={(row) => row.id}
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;