import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

function Serch(darkmode) {
  return (
    <div className={`p-2 md:p-5 rounded-md md:rounded-full  flex-col md:flex md:flex-row gap-2 items-center${darkmode ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}>
        <Select>
  <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
<Select>



  <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
    </div>
  )
}

export default Serch