import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller]);

  // Calculate total sales
  const totalSales = orders
    ? orders.reduce((acc, order) => acc + order.totalPrice, 0).toFixed(2)
    : "0.00";

  const error = () => {
    alert("Balance must be at least $50 to withdraw.");
  };

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${totalSales}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] !rounded`}
          onClick={() => (parseFloat(totalSales) < 50 ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
