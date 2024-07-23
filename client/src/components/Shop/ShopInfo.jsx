import React from 'react'
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';



const ShopInfo = ({isOwner}) => {

  const { seller, isLoading} = useSelector((state) => state.seller);

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`,{
      withCredentials: true,
    });
    window.location.reload();
  }

  return (
    <>
    {
     isLoading  ? (
       <Loader />
     ) : (
       <div>
       <div className="w-full py-5">
         <div className="w-full flex item-center justify-center">
           <img
             src=""
             alt=""
             className="w-[150px] h-[150px] object-cover rounded-full"
           />
         </div>
         <h3 className="text-center py-2 text-[20px]">{seller.name}</h3>
         <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
           {seller.description}
         </p>
       </div>
       <div className="p-3">
         <h5 className="font-[600]">Address</h5>
         <h4 className="text-[#000000a6]">{seller.address}</h4>
       </div>
       <div className="p-3">
         <h5 className="font-[600]">Phone Number</h5>
         <h4 className="text-[#000000a6]">{seller.phoneNumber}</h4>
       </div>
       <div className="p-3">
         <h5 className="font-[600]">Total Products</h5>
         <h4 className="text-[#000000a6]">10</h4>
       </div>
       <div className="p-3">
         <h5 className="font-[600]">Shop Ratings</h5>
         <h4 className="text-[#000000b0]">4/5</h4>
       </div>
       <div className="p-3">
         <h5 className="font-[600]">Joined On</h5>
         <h4 className="text-[#000000b0]">{seller?.createdAt?.slice(0, 10)}</h4>
       </div>
       {isOwner && (
         <div className="py-3 px-4">
            <Link to="/settings">
            <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
             <span className="text-white">Edit Shop</span>
           </div>
            </Link>
           <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
           onClick={logoutHandler}
           >
             <span className="text-white">Log Out</span>
           </div>
         </div>
       )}
     </div>
     )
    }
    </>
   );
}

export default ShopInfo