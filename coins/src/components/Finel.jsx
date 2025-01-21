import React from 'react'

function Finel() {
  return (
    <div className="md:container ">
    <div className="flex flex-col items-start md:flex-row">
     <div className="sidebar md:sticky top-16 w-full md:!w-2/5 md:me-8 pb-4 md:pb-16 overflow-hidden shrink-0">
     <div className='relative'>
        <div className="details-slider md:rounded-md image-slider s-slider-wrapper fullwidth-slider s-slider-has-notitle s-slider-v-centered s-slider-horizontal hydrated">
            <div className="swiper s-slider-container swiper-initialized swiper-horizontal swiper-pointer-events swiper-rtl swiper-watch-progress swiper-backface-hidden" dir='rt1'>
            </div></div>
                <div className="swiper-wrapper s-slider-swiper-wrapper">
                <a data-fslightbox="product_1138952112" data-img-id="148621516" data-slid-index="0" data-caption="كوينز  (PLAYSTATION / XBOX)" data-infinite="false" data-type="image" href="https://cdn.salla.sa/EAGzR/7a97376d-276d-43c5-9ca6-8679e67db946-1000x561.25-EG91NQ5TnLYK0tabsMRUcwp7KvFUFkco0g67Trmo.jpg" aria-label="1 / 1" className="swiper-slide magnify-wrapper homeslider__slide swiper-slide-visible swiper-slide-active" role="group">
                        <img  src="https://cdn.salla.sa/EAGzR/7a97376d-276d-43c5-9ca6-8679e67db946-1000x561.25-EG91NQ5TnLYK0tabsMRUcwp7KvFUFkco0g67Trmo.jpg" alt="كوينز  (PLAYSTATION / XBOX)" className="h-full w-full "/>
                        </a>
                </div>
                <div className='swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal swiper-pagination-lock'>
                    <span className='swiper-pagination-bullet swiper-pagination-bullet-active' role="button" aria-label="Go to slide 1" aria-current="true"></span>
                </div>
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>

            </div>
        </div>
     </div>
     <div className='main-content mob:container w-full md:w-1/2 md:pb-16'>
     <div className='flex flex-col'>
     <h1 className=" da-tm leading-normal text-lg md:text-xl pe-2">كوينز (PLAYSTATION / XBOX)</h1>
    <div className='price my-1'>
        <div className='flex whitespace-nowrap price-wrapper gap-4 items-center hidden'>
            
        </div>
    </div>
     </div>
     </div>
     </div>
   
  )
}

export default Finel