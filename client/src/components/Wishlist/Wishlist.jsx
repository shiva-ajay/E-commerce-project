import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../../styles/styles';
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";



const Wishlist = ({ setOpenWishlist }) => {

    const cartData = [
        {
          name: "iPhone 14 Pro Max 256 GB SSD and 8 GB RAM Silver Colour",
          description: "test",
          price: 999,
        },
        {
          name: "iPhone 14 Pro Max 256 GB SSD and 8 GB RAM Silver Colour",
          description: "test",
          price: 245,
        },
        {
          name: "iPhone 14 Pro Max 256 GB SSD and 8 GB RAM Silver Colour",
          description: "test",
          price: 645,
        },
      ];

  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
              <div>
                <div className='flex w-full justify-end pt-5 pr-5'>
                <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
                />
                </div>

                 {/* Item length */}

              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  3 items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cartData &&
                  cartData.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      
                    />
                  ))}
              </div>
            </div>
        </div>
    </div>
  )
}




const CartSingle = ({ data }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;
  

  
    return (
      <div className="border-b p-4">
        <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
        />
           <img
            src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818'
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
        
          <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              US${totalPrice}
            </h4>
          </div>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
          />
        </div>
      </div>
    );
  };


export default Wishlist