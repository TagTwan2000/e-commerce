// eslint-disable-next-line no-unused-vars
import React from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button';


function Navbar() {
    const {user,isSignedIn}=useUser();
  return (
    <div className='flex justify-between items-center shadow-sm p-5'>
       
        <ul className='hidden md:flex gap-16'>
            <li><select>
            <option value="SAR">SAR</option>
          <option value="AED">AED</option>
          <option value="KWD">KWD</option>
          <option value="BHD">BHD</option>
          <option value="OMR">OMR</option>
          <option value="JOD">JOD</option>
          <option value="USD">$USD</option>
          <option value="EUR">€EUR</option></select></li>
          <li><select><option value="EN">English</option>
          <option value="AR">عربي</option></select></li>
        </ul>
        <img src='/public/b.png' width={50} height={50}/>

        {isSignedIn?
        <div>
            <UserButton><Button>Submit</Button></UserButton>
            </div>
            : <Button>Submit</Button>
            }
    </div>
  )
}

export default Navbar