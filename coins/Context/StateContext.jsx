// StateContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import {toast} from 'react-hot-toast';
import { auth } from '../FirebaseConfig';
const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [coins, setCoins] = useState([]);
  const [market, setMarket] = useState([]);
  const [marketOption, setMarketOption] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(0);
  const [qtySbc, setQtySbc] = useState(0);
  const [isConsole, setIsConsole] = useState(true);
  const [coinsPrice, setCcoinsPrice] = useState(true);

  const userIN = auth.currentUser;

  const devicetyp =( type)=>{
    setIsConsole(type); 
  }

const addcoins =( Quantity)=>{
  setCoins([Quantity]); 
}
const addMarket = (marketOpen) => {
  setMarket([marketOpen]); 
};

useEffect(() => {
  console.log('Updated market:', cartItems);
}, [cartItems]);



const moodScreen =( type)=>{
  setDarkMode(type); 
}



useEffect(() => {
  console.log('Updated market:', market);
}, [market]);



  const onAdd = (product) => {
    if(qty== 0){
    setCartItems([product]);
    setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities+1)
    
    
  
    
    toast.success(` added to the cart.`); } else{toast.error(`can't added to the cart.`)}   };
  
    
    

    const coinsPricechange = (price) => {
      setCcoinsPrice(price);
      setTotalPrice((prevTotal) => prevTotal + price);
    };

const incQty = () => {
  setQty((prevQty) => {
    console.log('Incrementing qty:', prevQty + 1);
    return prevQty + 1;
  });
};

const decQty = () => {
  setQty((prevQty) => {
    const newQty = prevQty - 1 < 1 ? 1 : prevQty - 1;
    console.log('Decrementing qty:', newQty);
    return newQty;
  });
};

  return (
    <Context.Provider value={{userIN,moodScreen,darkMode, setDarkMode,totalPrice,setTotalPrice,setShowCart,showCart,totalQuantities,devicetyp,isConsole, setIsConsole ,coinsPricechange,market,addMarket,addcoins,coins,marketOption,setMarketOption,qty, incQty, decQty, onAdd, setCartItems, cartItems }}>
    {children}
  </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
