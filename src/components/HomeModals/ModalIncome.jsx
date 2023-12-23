

const ModalIncome = ({ active, handleClick }) => {
  return (
    <div className={`${active ? "block" : "hidden"}`}>
      <h3>Income</h3>
    </div>
  );
};

export default ModalIncome