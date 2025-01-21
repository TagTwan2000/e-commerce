import React from 'react'
import her from './../assets/hero.jpg'

function Hero() {
  return (
    <div className='pt-[75px] mx-[60px]  '>
        <img src={her} className='rounded-[12px] hover:scale-105 transition-all cursor-pointer  '/>
    </div>
  )
}

export default Hero