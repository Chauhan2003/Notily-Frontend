import React, { useContext } from "react";
import NotilyContext from "../context/Context";

const ProfileInfo = ({ onLogout }) => {
  const { user } = useContext(NotilyContext);

  return (
    <div className="flex items-center gap-3">
      <img
        src={user?.profileURL || "./profile-image.jpg"}
        alt="Profile"
        className="object-cover w-9 h-9 rounded-full cursor-pointer overflow-hidden"
      />

      <button
        className="text-sm bg-red-500 px-2 py-1 rounded-md text-white hover:opacity-80"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
