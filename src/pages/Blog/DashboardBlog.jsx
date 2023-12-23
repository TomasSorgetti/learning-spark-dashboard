import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, searchPosts } from "../../redux/actions";
import BlogCard from "../../components/BlogCard/BlogCard";
import Navigation from "../../components/Navigation/Navigation";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../utils/url";

const DashboardBlog = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const [direction, setDirection] = useState("asc");
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(searchPosts(search,direction));
  }, [search,direction]);

  const changeDirection = (event) => {
    setDirection(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleDelete = async (id) => {
    const URL = `${URL_BASE}/posts/${id}`;
    if (confirm("Are you sure to delete blog?")) {
      await axios
        .delete(URL, {
          headers: {
            authorization: `${token}`,
          },
        })
        .then((response) => {
          if (response) {
            dispatch(getAllPosts());
          }
        });
    }
  };

  return (
    <div>
      <Navigation />
      <h1 className="text-center text-[3rem] font-bold text-titleColor py-5">
        Blog
      </h1>
      <Link className="absolute right-10 top-24" to="/add-new-blog">
        Add New
      </Link>
      <article className="flex gap-2 justify-center">
        <input
          className="border-[1px] border-black rounded-sm"
          onChange={handleSearch}
          name="search"
          value={search}
          type="text"
        />
        <select
          onChange={changeDirection}
          className="border-[1px] border-black rounded-sm"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </article>
      <article className="px-60 py-10 flex flex-col gap-4">
        {posts?.map((post) => (
          <BlogCard key={post.id} post={post} handleDelete={handleDelete} />
        ))}
      </article>
    </div>
  );
};

export default DashboardBlog;
