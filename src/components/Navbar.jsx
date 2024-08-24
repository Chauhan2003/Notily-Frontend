import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import NotilyContext from "./context/Context";
import { userRoute } from "../Routes";
import SearchBar from "./searchBar/SearchBar";
import ProfileInfo from "./Cards/ProfileInfo";

const Navbar = ({ onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setUser } = useContext(NotilyContext);

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      const res = await axios.get(`${userRoute}/signout`);
      setUser(null);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white flex items-center justify-between px-10 h-[50px] drop-shadow">
      <div className="flex items-center gap-2">
        <img src="./logo.png" alt="Notily Logo" className="w-10" />
        <div
          className="text-2xl font-semibold text-black"
          style={{
            fontFamily: '"DM Serif Text", serif',
          }}
        >
          Notily
        </div>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
