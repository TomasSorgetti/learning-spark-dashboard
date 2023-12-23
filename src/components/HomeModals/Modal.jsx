
import { useState } from "react";

const Modal = ({ label, active, handleClick,handleSend }) => {
  const [first, setFirst] = useState(0);
  const handleChange = (event) => {
    setFirst(event.target.value);
  };
  
  return (
    <div className={`${active ? "block" : "hidden"}`}>
      <h3>{label}</h3>
      <div
        className="flex gap-2
      "
      >
        <input onChange={handleChange} type="number" value={first} />
        <button onClick={()=>{handleSend(first, label)}}>Add</button>
        <button
          onClick={() => {
            setFirst(0);
            handleClick();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
