import React from 'react';

function Chaleng() {
  return (
    <div className="flex flex-col items-center justify-center relative mt-10">
      {/* Container for the lines and subheading */}
      <div className="relative w-full flex items-center">
        {/* Left Line */}
        <div className="flex-grow h-px bg-gray-300"></div>

        {/* Subheading */}
        <h2 className='text-center mx-4'>OR</h2>

        {/* Right Line */}
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* 'Or' Heading */}
      <h1 className='text-center mt-5 text-xl font-semibold'>Buy one of the other products available in our store</h1>

      {/* Buttons Container */}
      <div className='flex flex-col w-full mt-10 px-16'>
        {/* First Row */}
        <div className='flex justify-between space-x-4 mb-4'>
          {/* Button 1 */}
          <button className='flex items-center justify-center w-1/2 border-none bg-transparent'>
            <img
              src='https://cdn.salla.sa/form-builder/p4MaRl37FXxYppEK5mTKRIljFwYtr91BcaK0NNux.jpg'
              alt="Button 1"
              className='w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer'
            />
            <span className='sr-only'>Button 1 Description</span>
          </button>

          {/* Button 2 */}
          <button className='flex items-center justify-center w-1/2 border-none bg-transparent'>
            <img
              src='https://cdn.salla.sa/form-builder/45FqA5qjZ58jtnb1BtTGrjX68GrG9xFMJzuUtTbj.jpg'
              alt="Button 2"
              className='w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer'
            />
            <span className='sr-only'>Button 2 Description</span>
          </button>
        </div>

        {/* Second Row */}
        <div className='flex justify-between space-x-4'>
          {/* Button 3 */}
          <button className='flex items-center justify-center w-1/2 border-none bg-transparent'>
            <img
              src='https://cdn.salla.sa/form-builder/45FqA5qjZ58jtnb1BtTGrjX68GrG9xFMJzuUtTbj.jpg'
              alt="Button 3"
              className='w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer'
            />
            <span className='sr-only'>Button 3 Description</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chaleng;
