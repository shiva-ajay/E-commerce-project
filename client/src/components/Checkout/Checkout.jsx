import React from "react";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "1234567890",
    addresses: [
      {
        addressType: "Home",
        address1: "123 Main St",
        address2: "Apt 4",
        zipCode: "12345",
        country: "US",
        city: "New York"
      }
    ]
  };

  const cart = [
    {
      qty: 2,
      discountPrice: 50,
      shopId: "1"
    },
    {
      qty: 1,
      discountPrice: 30,
      shopId: "2"
    }
  ];

  const country = "US";
  const city = "New York";
  const address1 = "123 Main St";
  const address2 = "Apt 4";
  const zipCode = "12345";
  const couponCode = "DISCOUNT10";
  const couponCodeData = {
    shopId: "1",
    value: 10
  };
  const discountPrice = (cart[0].qty * cart[0].discountPrice * couponCodeData.value) / 100;

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.1;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPrice).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const navigate = useNavigate();

  const paymentSubmit = () => {
    if (address1 === "" || address2 === "" || zipCode === "" || country === "" || city === "") {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Coupon applied successfully!");
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            city={city}
            address1={address1}
            address2={address2}
            zipCode={zipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            discountPrice={discountPrice}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({ user, country, city, address1, address2, zipCode }) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user.name}
              required
              className={`${styles.input} !w-[95%]`}
              readOnly
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user.email}
              required
              className={`${styles.input}`}
              readOnly
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
              readOnly
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              required
              className={`${styles.input}`}
              readOnly
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <input
              type="text"
              value={country}
              required
              className={`${styles.input} !w-[95%]`}
              readOnly
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <input
              type="text"
              value={city}
              required
              className={`${styles.input} !w-[95%]`}
              readOnly
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              value={address1}
              className={`${styles.input} !w-[95%]`}
              readOnly
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              required
              className={`${styles.input}`}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  discountPrice,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - ${discountPrice ? discountPrice.toFixed(2) : "0.00"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupon code"
          value={couponCode}
          readOnly
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
