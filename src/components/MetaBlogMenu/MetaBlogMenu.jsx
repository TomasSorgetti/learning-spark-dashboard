
const MetaBlogMenu = ({ handleSend }) => {
  return (
    <div className="font-poppins w-[400px] border-l-[1px] border-lightGrayColor p-6">
      <h6 className="font-bold text-titleColor text-[1.5rem]">Post settings</h6>
      <button
        className="mt-10 mb-20 text-[1.3rem] text-titleColor border-2 border-titleColor px-3 py-1 rounded-md shadow-md hover:bg-titleColor hover:text-white hover:font-bold focus:shadow-xl"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MetaBlogMenu