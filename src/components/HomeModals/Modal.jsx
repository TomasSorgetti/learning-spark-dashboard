import { useState } from "react";

const Modal = ({ label, active, handleClick, handleSend, handleCancel }) => {
  const [first, setFirst] = useState(0);
  const handleChange = (event) => {
    setFirst(event.target.value);
  };

  return (
    <div
      className={`${
        active ? "block" : "hidden"
      } p-6 z-30 h-[200px] w-[400px] absolute top-[40%] left-[40%] bg-gray-100 shadow-2xl rounded-lg text-center text-titleColor flex flex-col justify-between`}
    >
      <h3 className="font-semibold text-[1.5rem]">{label}</h3>
      <div className="h-full flex flex-col justify-between pt-6 px-20 items-center">
        <input
          className="text-titleColor border-titleColor border-2 rounded-sm h-8 w-full px-4"
          onChange={handleChange}
          type="number"
          value={first}
        />
        <div className="flex w-full justify-between">
          <button
            className="text-white bg-titleColor hover:bg-[#332663] font-semibold text-[1rem] px-6 py-2 rounded-md"
            onClick={() => {
              handleSend(first, label);
              setFirst(0);
              handleCancel();
            }}
          >
            Add
          </button>
          <button
            className="text-white bg-buttonColor hover:bg-[#FE1E45] focus:bg-[#C61130] font-semibold text-[1rem] px-4 py-2 rounded-md"
            onClick={() => {
              setFirst(0);
              handleCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
