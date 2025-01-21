import React from 'react';
import { useInView } from 'react-intersection-observer';
import logoicoon from './../assets/b.png';
import Chaleng from './Chaleng';
import { useNavigate } from 'react-router-dom'; 

function List() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate(); 

  return (
    <div
      ref={ref}
      className={`mt-5 flex flex-col items-center justify-center relative transition-opacity transform duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center w-full mb-8">
        <img
          src={logoicoon}
          alt="Logo"
          className="w-10 h-10 sm:w-30"
        />
      </div>
      
      {/* Main Content Section */}
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Lines and Heading */}
        <div className="relative w-full flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <h1 className='text-center mx-4 text-xl font-semibold'>To buy coins and sell coins</h1>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Subheading */}
        <h2 className='text-center mt-2 text-lg'>Your trusted source for coin transactions</h2>

        {/* Buttons Container */}
        <div className='flex flex-col w-full mt-10 px-4 sm:px-16'>
          <div className='flex justify-between w-full space-x-4'>
            {/* Button 1 */}
            <button className='flex items-center justify-center w-1/2'>
              <img
                src='https://cdn.salla.sa/form-builder/WYHlddE5slvXFTTiK69wDKjwKvz0Sal3RQ0pU6ff.jpg'
                alt="Responsive Website"
                className='w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer'
              />
              <span className='sr-only'>Website Responsive for All Devices</span>
            </button>

            {/* Button 2 */}
            <button className='flex items-center justify-center w-1/2' onClick={() => navigate('/order')}>
              <img
                src='https://cdn.salla.sa/form-builder/h2E3KFpQSf6KlJ7uvEpcPxcOtnSUohq5Moc6ZCr5.jpg'
                alt="Second Button"
                className='w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer'
              />
              <span className='sr-only'>Second Button Description</span>
            </button>
          </div>
        </div>
      </div>
      <Chaleng />
    </div>
  );
}

export default List;
