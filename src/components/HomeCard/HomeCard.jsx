const HomeCard = ({ text, metric }) => {
  return (
    <div className="relative h-32 w-64 mt-6 rounded-lg shadow-xl bg-white text-subTitleColor flex flex-col items-start justify-end">
      <div className="absolute z-[-1] top-[-5px] left-0 w-full h-full bg-subTitleColor rounded-lg"></div>
      <div className="p-6">
        <span className="text-textColor">{text}</span>
        <p className="text-titleColor font-semibold text-[1.5rem]">{metric}</p>
      </div>
    </div>
  );
};

export default HomeCard;
