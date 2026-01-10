"use client";

import Image from "next/image";
import { useNavbar } from "./NavbarContextProvider";
import SearchBar from "./SearchBar";

const Header = () => {
  const { setActive } = useNavbar();

  return (
    <header className="flex justify-between min-[1400px]:justify-center items-center gap-2 w-full h-16 mask-image-to-bottom">
      
      {/* Mobile menu button */}
      <button
        onClick={() => setActive((prev: boolean) => !prev)}
        className="shrink-0 h-16 flex items-center px-6 min-[1400px]:hidden"
      >
        <Image
          src="/icons/list_dark.png"
          alt="menu"
          width={26}
          height={26}
        />
      </button>

      {/* Search */}
      <div className="w-60 md:w-xl mx-2">
        <SearchBar />
      </div>

    </header>
  );
};

export default Header;
