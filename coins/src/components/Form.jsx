import React, { useState, useEffect } from 'react';
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import pcicon from './../assets/pc-tower.png';
import consolicon from './../assets/consel.png';
import Selectyes from './Selectyes';
import SelectDevice from './SelectDevice';
import { useNavigate } from 'react-router-dom'; 

import Infon from './Infon';
import Currency from './Currency';
import { FaCcStripe } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { PiMoneyThin } from "react-icons/pi";
import { useStateContext } from '../../Context/StateContext';
import {toast} from 'react-hot-toast';
function Form() {
    const [price, setPrice] = useState(null);
    
    const [currency, setCurrency] = useState("SAR");
    const [conversionRate, setConversionRate] = useState(1.0);
    const [showInfo, setShowInfo] = useState(false);
    const [showOrderWarning, setShowOrderWarning] = useState(false);
    const [warningInterval, setWarningInterval] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState('none');
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isUsersLogin, setIsUserLogin] = useState(false); // 
    const { coinsPricechange,onAdd,setShowCart,isConsole,devicetyp,userIN} = useStateContext(); // Get cartItems here
    const navigate = useNavigate(); 
    
    const toggleUserlogin = () => setIsUserLogin(!isUsersLogin);
    const [formData, setFormData] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
     // State for the product list

  // New handler to receive the product object list
        const handleProductChange = (products) => {
            setSelectedProducts(products); // Set the product list
        };
    

    const handleDataChange = (data) => {
        setFormData(data);
    };

    const toggleDevice = () => {
        devicetyp(!isConsole);
    };

    const handleInfoClick = () => {
        setShowInfo(true);
        startOrderWarning();
    };

    const handleOrderClick = () => {
        setShowInfo(false);
        stopOrderWarning();
    };

    const startOrderWarning = () => {
        setShowOrderWarning(true);
        const interval = setInterval(() => {
            setShowOrderWarning(prev => !prev);
        }, 2000);
        setWarningInterval(interval);
    };

    useEffect(() => {
        console.log('Updated data:', formData);
      }, [formData]);
    const stopOrderWarning = () => {
        setShowOrderWarning(false);
        clearInterval(warningInterval);
        setWarningInterval(null);
    };

    useEffect(() => {
        return () => {
            stopOrderWarning();
        };
    }, []);

    useEffect(() => {
        console.log('Updated selectedQuantityDisplay:', selectedProducts);
      }, [selectedProducts]);



      const addCartItem = () => {
        if(price>0){
        if (!isFormComplete) {
            toast.error('Fields must be filled in')
            return;
        }
    
        const product = {
            device: isConsole ? 'Coins for (XBOX/PS)' : 'Coins for (PC)',
            coins: selectedProducts,
            informtin: formData,
        };
        coinsPricechange(price)
        setShowCart(true)
        onAdd(product);
    } else{toast.error('chose your coins quntity')}};
    
    
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 pt-10 px-4 mt-[32px] relative flex flex-col">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center">
                {/* Main Content */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0 lg:ml-[30px] mx-[20px]">
                    <img
                        className="object-cover w-full h-auto rounded-lg"
                        src="https://cdn.salla.sa/EAGzR/7a97376d-276d-43c5-9ca6-8679e67db946-1000x561.25-EG91NQ5TnLYK0tabsMRUcwp7KvFUFkco0g67Trmo.jpg"
                        alt="Decorative Image"
                    />
                </div>

                <div className="lg:w-1/2 w-full p-8 lg:ml-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg relative z-10">
                    {/* Header and Info Section */}
                    <div className="flex items-center justify-end mb-[5px]">
                        {!showInfo && (
                            <button 
                                onClick={handleInfoClick} 
                                aria-label="More information" 
                                className="hover:scale-105 transition-all cursor-pointer flex items-center mr-4 text-[12px]"
                            >
                                Info <IoMdArrowDropright />
                            </button>
                        )}
                    </div>

                    {showInfo ? (
                        <div>
                            <div className="flex items-center justify-between mb-[5px]">
                                {showOrderWarning && (
                                    <div className="absolute">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                                    </div>
                                )}
                                <button 
                                    onClick={handleOrderClick} 
                                    aria-label="Orders" 
                                    className="hover:scale-105 transition-all cursor-pointer flex items-center mr-4 text-[12px]"
                                >
                                    <IoMdArrowDropleft /> Orders
                                </button>
                            </div>
                            <Infon />
                        </div>
                    ) : (
                        <>
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
                                
                                <Currency 
                                    currency={currency}
                                    setCurrency={setCurrency}
                                    conversionRate={conversionRate}
                                    setConversionRate={setConversionRate}
                                />
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
                                        onProductChange={handleProductChange} // Pass cart items
                                        />
                                </div>
                                <Selectyes onFormComplete={setIsFormComplete} onDataChange={handleDataChange} />
                            </div>
                            <section className='bg-gray-100 dark:bg-gray-900 p-5 mt-4 rounded-lg flex justify-between items-center h-3'>
                                <div className="flex items-center">
                                    <PiMoneyThin className="text-sm mr-1 font-semibold" /> {/* Adjust size and add margin */}
                                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">price:</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{price} SAR</span>
                            </section>

                           
                        </>
                    )}
                </div>
            </div>


          
            <section className='bg-gray-200 dark:bg-gray-800 p-5 mt-auto'>
    <div className="container flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 px-10">
        <div className='flex gap-4 w-2/3 hidden sm:flex md:flex'>
            <div className='flex items-center'>
                <img 
                    className='w-16 h-12 rounded-lg' 
                    src="https://cdn.salla.sa/EAGzR/7a97376d-276d-43c5-9ca6-8679e67db946-1000x561.25-EG91NQ5TnLYK0tabsMRUcwp7KvFUFkco0g67Trmo.jpg" 
                    alt="Device Image" 
                />
                <div className="ml-32">
                    <h2 className='text-lg md:text-xl leading-normal text-gray-900 dark:text-gray-100'>
                        {isConsole ? 'Coins for (XBOX/PS)' : 'Coins for (PC)'}
                    </h2>
                    <p className='text-md text-gray-700 dark:text-gray-300'>
                        {price} SAR
                    </p>
                </div>
            </div>
        </div>
        
        {/* Right-aligned buttons */}
        <div className='flex justify-end w-1/3 ml-[70px] sm:w-full md:w-full'>
            <button 
                onClick={() => {
                    addCartItem();  // Call the add-to-cart logic
                }} 
                className='bg-blue-500 text-white px-4 py-2 flex-1 mr-2 flex items-center justify-center'
            >
                Add to Cart <FaPlus className="ml-2" />
            </button>
            
            <button 
                onClick={() => { 
                    if (userIN) { 
                        console.log('dffgds');
                    } else { 
                        toggleUserlogin(); 
                    } 
                }} 
                className='bg-green-500 text-white px-4 py-2 flex-1 flex items-center justify-center'
            >
                Pay <FaCcStripe className="ml-2" />
            </button>
        </div>
    </div>
</section>


            

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
    {/* Backdrop specifically for AuthContainer */}
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-md"
      onClick={toggleUserlogin}
    >
    {/* Modal */}
    <div className="fixed inset-0 flex justify-center items-center z-20">
      <div onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside modal from closing it */}
        <AuthContainer />
      </div>
    </div>
    </div>
  </div>
)}
        </div>
    );
}

export default Form;
