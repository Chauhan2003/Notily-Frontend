import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-40 sm:w-60 md:w-80 flex items-center pr-4 bg-slate-100 rounded">
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-sm bg-transparent pl-5 pr-2 h-[35px] outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-slate-500 text-xl cursor-pointer hover:text-black mr-1"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-500 text-lg cursor-pointer hover:text-black mr-1"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
