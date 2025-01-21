import React from 'react'
import { CiLogout } from "react-icons/ci";
import { PiShoppingCartSimple } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { IoStorefrontOutline } from "react-icons/io5";
const Usersub = ({ darkMode }) => {
  return (
    <div className={`absolute right-0 mt-[43px] w-40 bg-white shadow-lg rounded-md bg-opacity-90  ${darkMode ? 'bg-zinc-900 text-white' : 'text-black'} `}>
           <ul className="p-2">
             <li className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
               <IoStorefrontOutline className="mr-2" /> Orders
             </li>
             <li className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
               <LuUser2 className="mr-2" /> Account
             </li>
             <li className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
               <PiShoppingCartSimple className="mr-2" /> Cart
               
             </li>
             <li className="flex items-center p-2 hover:bg-gray-200 cursor-pointer text-red-600">
               <CiLogout className="mr-2 text-red-600" /> Exit
             </li>
           </ul>
         </div>
  )
}

export default Usersub