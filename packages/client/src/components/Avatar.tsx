import React from "react";

interface AvatarProps {}

export const Avatar: React.FC<AvatarProps> = () => {
  return (
    <button className="group w-full p-1.5 rounded-full text-left focus:outline-none focus:ring transition hover:bg-primary-100 flex items-center space-x-3">
      <img
        src="https://lh3.googleusercontent.com/ogw/ADGmqu9sWWnbWp32D9a_7uCKWxGOLPVTJ6fJfc3jaCkupw=s192-c-mo"
        alt="Profile"
        className="rounded-full w-12 h-12"
      />
      <div>
        <h3 className="group-hover:text-primary-500 text-gray-800 font-bold text-lg leading-none mb-0.5">
          Kevin Lu
        </h3>
        <p className="group-hover:text-primary-400 text-gray-500 text-sm">@coderinblack</p>
      </div>
    </button>
  );
};
