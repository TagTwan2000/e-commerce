import React from 'react'
import { Separator } from './ui/separator'

const Infon = () => {
  return (
    <div className="text-center my-4">
                                <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-cyan-100 bg-clip-text text-transparent animate-gradient shadow-SM hover:scale-105 transition-all cursor-pointer">
                                    Welcome to Ultimate Store
                                </h2>
                                <p className='text-left'><span className='text-[30px]'>.</span> For all FC services, we are honored to serve you around the clock.</p>
                                <p className='text-left'><span className='text-[30px]'>.</span> Safe and guaranteed shipping from band and zero.</p>
                                <Separator className='bg-gray-300 dark:bg-slate-50'/>
                                <h4 className="text-xl font-medium mt-[20px]">Coin transfer through open market</h4>
                                <p className='text-left'><span className='text-[30px]'>.</span> Please make sure the transfer market is open in Companion.</p>
                                <p className='text-left'><span className='text-[30px]'>.</span> You must have 5,000 coins in your account to start the coin transfer process.</p>
                                <p className='text-left'><span className='text-[30px]'>.</span> It is forbidden to access the account from the device or from the application during the transfer process to avoid a ban.</p>
                                <p className='text-left'><span className='text-[30px]'>.</span> After completing the transfer process, you must change your account password to avoid any future breaches (the store does not bear any responsibility towards the account if the password is not changed)</p>
                                <Separator className='bg-gray-300 dark:bg-slate-50'/>
                                <h4 className="text-xl font-medium mt-[20px]">Coin transfer through close market</h4>
                                <p className='text-left'><span className='text-[30px]'>.</span> A customer service Agent will contact you as soon as possible.</p>
                                <p className='text-left'><span className='text-[30px]'>.</span> You must follow the instructions of the customer service Agent.</p>
                                <p className='text-left'><span className='text-[30px]'>.</span> The customer service Agent will treat you with kindness and politeness. Treat him in the same manner.</p>
                                <p className='text-left'><span className='text-[30px]'>.</span> Spend the full amount of coins after the transfer process.</p>
                                <p className='text-left'><span className='text-[30px]'>.</span> Do not sell any player until after 24 hours.</p>
                                <p className='text-left'><span className='text-[30px]'>.</span> Failure to comply with the terms and conditions will prevent you from obtaining the warranty.</p>
                            </div>
  )
}

export default Infon