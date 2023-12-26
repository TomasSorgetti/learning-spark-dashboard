import { useState } from "react";

const HomeCard = ({ text, metric, addNew,handleClick}) => {
  
  return (
    <div className="relative h-32 w-64 mt-6 rounded-lg shadow-xl bg-white text-subTitleColor flex flex-col items-start justify-end">
      <div className="absolute z-[-1] top-[-5px] left-0 w-full h-full bg-subTitleColor rounded-lg"></div>
      <div className="p-6">
        <span className="text-textColor">{text}</span>
        <p className="text-titleColor font-semibold text-[1.5rem]">{metric}</p>
      </div>
      {addNew && (
        <button
          className="text-white absolute top-4 right-4 bg-gray-500 hover:bg-gray-400 focus:bg-gray-300 w-6 h-6 rounded-md "
          onClick={handleClick}
        >
          +
        </button>
      )}
    </div>
  );
};

export default HomeCard;
