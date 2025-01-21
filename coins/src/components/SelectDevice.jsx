import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../FirebaseConfig'; // Adjust this path as needed
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStateContext } from '../../Context/StateContext';

function SelectDevice({  deviceType, currency, conversionRate, selectedQuantity, setSelectedQuantity, setPrice, onProductChange }) {
  const [quantities, setQuantities] = useState([]);
  const {  cartItems,  } = useStateContext();

  useEffect(() => {
    const getPrice = async () => {
      if (selectedQuantity === 'none') {
        setPrice('0');
        return;
      }

      const db = getDatabase(app);
      const priceRef = ref(db, `coins/${deviceType}`);
      const snapshot = await get(priceRef);

      if (snapshot.exists()) {
        const coins = snapshot.val();
        let foundCoin = null;

        for (const key in coins) {
          if (coins[key].COIN_Q === parseInt(selectedQuantity, 10)) {
            foundCoin = coins[key];
            break;
          }
        }

        if (foundCoin && foundCoin.price) {
          setPrice(foundCoin.price);
        } else {
          alert('Quantity not found or not visible');
        }
      } else {
        alert('Error retrieving data');
      }
    };

    getPrice();
  }, [deviceType, selectedQuantity, setPrice]);

  useEffect(() => {
    const fetchQuantities = async () => {
      const db = getDatabase(app);
      const quantitiesRef = ref(db, `coins/${deviceType}`);

      try {
        const snapshot = await get(quantitiesRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const fetchedQuantities = Object.entries(data)
            .filter(([key, value]) => value.visbel === "yes")
            .map(([key, value]) => {
              const adjustedPrice = (value.price * conversionRate).toFixed(2);
              return {
                id: key,
                display: `${value.COIN_Q} ${value.DICRIB_Q} ${adjustedPrice}`,
                COIN_Q: value.COIN_Q,
                DICRIB_Q: value.DICRIB_Q,  // Add DICRIB_Q to track description
              };
            });
          setQuantities(fetchedQuantities);

          // Pre-select based on cartItems
          const matchedItem = fetchedQuantities.find(q =>
            cartItems[0]?.coins?.some(item => item.COIN_Q === q.COIN_Q)
          );
          if (matchedItem) {
            setSelectedQuantity(matchedItem.COIN_Q);
          }
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchQuantities();
  }, [deviceType, conversionRate, cartItems]);

  useEffect(() => {
    if (selectedQuantity !== 'none') {
      console.log(`Selected quantity: ${selectedQuantity}`);
    }
  }, [selectedQuantity]);

  const handleSelect = (value) => {
    if (value !== 'none') {
      const selectedQuantityObject = quantities.find(q => q.COIN_Q === parseInt(value, 10));

      if (selectedQuantityObject) {
        const product = {
          COIN_Q: selectedQuantityObject.COIN_Q,
          DICRIB_Q: `${selectedQuantityObject.COIN_Q} ${selectedQuantityObject.DICRIB_Q}`,
        };
        
        console.log('Selected product:', product);

        // Pass the product object to the parent component
        onProductChange([product]);
      }

     
    }
    setSelectedQuantity(value);
  };
  return (
    <Select value={selectedQuantity} onValueChange={handleSelect}>
      <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg text-gray-900 dark:text-gray-100">
        <SelectValue placeholder="Select Quantity*" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Select Quantity*</SelectItem>
        {quantities.map((quantity) => (
          <SelectItem key={quantity.id} value={quantity.COIN_Q}>
            {quantity.display} {currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectDevice;
