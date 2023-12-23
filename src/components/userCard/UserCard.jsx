import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { URL_BASE } from "../../utils/url";
const UserCard = ({ user }) => {
  const { id, name, email, createdAt, role } = user;
  const [userRole, setUserRole] = useState(role);
  const fecha = new Date(createdAt);
  const date = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;

  const token = localStorage.getItem("token");
  const URL = `${URL_BASE}/user/changeUserRole`;
  useEffect(() => {
    if (role !== userRole) {
      const changeRole = async () => {
        try {
          await axios
            .put(
              URL,
              { userId: id, userRole },
              {
                headers: {
                  authorization: `${token}`,
                },
              }
            )
            .then((response) => {
              console.log(response);
            });
        } catch (error) {
          console.log(error);
        }
      };
      changeRole();
    }
  }, [userRole]);

  const handleChange = (event) => {
    setUserRole(event.target.value);
  };

  return (
    <div className="flex gap-2 text-white bg-titleColor px-10 py-4 rounded-md justify-between">
      <h5>{name}</h5>
      <p>{email}</p>
      <div className="flex w-60 justify-between">
        <p>{date}</p>
        <select
          onChange={handleChange}
          value={userRole}
          className="text-subTitleColor rounded-sm"
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>
    </div>
  );
};

export default UserCard;
