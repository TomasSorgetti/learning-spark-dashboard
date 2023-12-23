import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrdered, searchUserByEmail } from "../../redux/actions";

import Navigation from "../../components/Navigation/Navigation";
import UserCard from "../../components/userCard/UserCard";
import { useState } from "react";

const DashboardUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState("all");
  const [search, setSearch] = useState("");
  const [direction, setDirection] = useState("asc");

  useEffect(() => {
    dispatch(searchUserByEmail(search,token));
  }, [search]);
  useEffect(() => {
    dispatch(getUsersOrdered(order, direction, token));
  }, [order, direction]);
  const changeOrder = (event) => {
    setOrder(event.target.value);
  };
  const changeDirection = (event) => {
    setDirection(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Navigation />
      <h1 className="p-5 text-center text-[3rem] font-bold text-titleColor">
        Users
      </h1>
      <article className="flex gap-2 justify-center">
        <input
          className="border-[1px] border-black rounded-sm"
          onChange={handleSearch}
          name="search"
          value={search}
          type="text"
        />
        <select
          onChange={changeOrder}
          className="border-[1px] border-black rounded-sm"
        >
          <option value="all">all</option>
          <option value="date">date</option>
          <option value="email">email</option>
          <option value="admin">admin</option>
        </select>
        <select
          onChange={changeDirection}
          className="border-[1px] border-black rounded-sm"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </article>
      <article className="flex flex-col gap-2 px-60 mt-10">
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
        {!users.length && <p>No users found</p>}
      </article>
    </div>
  );
};

export default DashboardUsers;
