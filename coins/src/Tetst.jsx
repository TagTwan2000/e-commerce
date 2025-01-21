import React, { useState } from 'react';
import CreateCartInfox from '../StateContext';
import App from './App';
import Moin from './Moin';

const AppWrapper = () => {
  const [cartDate, setCartDate] = useState('');  // Shared state for both App and Moin
  const cartValue = { cartDate, setCartDate };

  return (
    <CreateCartInfox.Provider value={cartValue}>
      <App />
      <Moin />
    </CreateCartInfox.Provider>
  );
};

export default AppWrapper;
