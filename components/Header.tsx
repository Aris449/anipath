"use client";

import Image from 'next/image'
import { useNavbar } from './NavbarContextProvider'
const Header = () => {

  return (
    <header className="flex justify-center items-center gap-2 w-full h-16">

     
        <div className='w-60 md:w-xl mx-2 h-12 bg-bg-dark rounded-4xl flex justify-between items-center '>
            <input type="text" placeholder="Search" className="w-full h-full  flex items-center ml-4 outline-none placeholder:text-(--color-foreground)"  />
            <Image src='/icons/search_dark.png' alt='search-icon' width={20} height={20} className='mr-4'/>
        </div>

    </header>
  )
}

export default Header
