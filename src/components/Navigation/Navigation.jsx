import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="font-poppins text-subTitleColor flex justify-between w-full px-16 py-6 shadow-md">
      <h1 className="text-[1.5rem] font-bold text-titleColor">
        DASHBOARD
      </h1>
      <div className="flex gap-6 items-center">
        <Link className={`${window.location.pathname === "/home" && "font-bold"}`} to="/home">Home</Link>
        <Link className={`${window.location.pathname === "/users" && "font-bold"}`} to="/users">Users</Link>
        <Link className={`${window.location.pathname === "/blog" && "font-bold"}`} to="/blog">Blog</Link>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
};

export default Navigation;
