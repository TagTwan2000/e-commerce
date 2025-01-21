import React, { useState } from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import pcicon from './../assets/pc-tower.png';
import consolicon from './../assets/consel.png';
import Selectyes from './Selectyes';
import SelectDevice from './SelectDevice';
import { Button } from './ui/button';
import { FaCcStripe } from "react-icons/fa";
import { auth } from '../../FirebaseConfig';
import AuthContainer from './AuthContainer';
import { Separator } from './ui/separator';
import { useStateContext } from '../../Context/StateContext';

function Cart() {
    const [price, setPrice] = useState(null);
    const [currency, setCurrency] = useState("SAR");
    const [selectedQuantity, setSelectedQuantity] = useState('none');
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isUsersLogin, setIsUserLogin] = useState(false);
    const [conversionRate] = useState(1.0);
    const { coins, cartItems, totalPrice, isConsole, devicetyp, showCart } = useStateContext();
    const userIN = auth.currentUser;

    const toggleUserlogin = () => setIsUserLogin(!isUsersLogin);

    const toggleDevice = () => {
        devicetyp(!isConsole);
    };

    const handleDataChange = (data) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 pt-10 px-4 mt-[32px] relative">
            {showCart ? (
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center">
                    {/* Main Content */}
                    <div className="lg:w-1/2 w-full p-8 lg:ml-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg relative z-10">
                        {/* Device Selection and Quantity */}
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={toggleDevice} className="hover:scale-105 transition-all cursor-pointer flex items-center mr-4">
                                <img
                                    className="w-6 h-6 sm:w-7 sm:h-7"
                                    src={isConsole ? consolicon : pcicon}
                                    alt={isConsole ? 'Console Icon' : 'PC Icon'}
                                />
                                <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {isConsole ? 'Coins for (XBOX/PS)' : 'Coins for (PC)'}
                                </span>
                            </button>
                        </div>

                        {/* Quantity Selection */}
                        <div className="flex flex-col gap-5 mt-5">
                            <div className="flex flex-col">
                                <label className="text-lg font-medium mb-2 flex items-center text-gray-900 dark:text-gray-100">
                                    Quantity <span className="text-red-500">*</span>
                                </label>
                                <SelectDevice 
                                    deviceType={isConsole ? 'consel' : 'pc'} 
                                    currency={currency} 
                                    conversionRate={conversionRate} 
                                    selectedQuantity={selectedQuantity}
                                    setSelectedQuantity={setSelectedQuantity}
                                    setPrice={setPrice} 
                                    cartItems={coins} 
                                />
                            </div>
                            <Selectyes onFormComplete={setIsFormComplete} cartItems={cartItems} onDataChange={handleDataChange}/>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 flex justify-center lg:justify-start mt-6 lg:mb-0 lg:ml-[30px] mx-[20px]">
                        <div className="lg:w-2/3 w-full p-10 lg:ml-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                            <h2 className='text-lg font-semibold'>Your order</h2>
                            <Separator className='bg-gray-300 dark:bg-slate-50'/>
                            <div className="flex justify-between mt-4">
                                <h2 className='w-full'>Total Products</h2>
                                <span>{totalPrice}</span>
                            </div>
                            <div className="flex justify-between mt-4">
                                <h2>Price:</h2>
                                <span>{totalPrice} SAR</span>
                            </div>
                            <button 
                                onClick={() => { 
                                    if (userIN) { 
                                        console.log('Payment processing...'); 
                                    } else { 
                                        toggleUserlogin(); 
                                    } 
                                }} 
                                className='bg-green-500 text-white px-4 py-3 w-full flex items-center justify-center mt-4'
                            >
                                Pay <FaCcStripe className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">No items in cart</h2>
                </div>
            )}

            {/* Buy Me a Coffee Button */}
            <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <a
                    title="Buy me a pizza"
                    href="https://www.buymeacoffee.com/Dekartmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
                >
                    <img
                        className="object-cover object-center w-full h-full rounded-full"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                        alt="Pizza Icon"
                    />
                </a>
            </div>

            {isUsersLogin && (
                <div>
                    <div
                        className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-md"
                        onClick={toggleUserlogin}
                    >
                        <div className="fixed inset-0 flex justify-center items-center z-20">
                            <div onClick={(e) => e.stopPropagation()}>
                                <AuthContainer />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
