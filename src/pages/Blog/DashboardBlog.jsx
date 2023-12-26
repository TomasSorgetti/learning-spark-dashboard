import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts, searchSubjects } from "../../redux/actions";
import BlogCard from "../../components/BlogCard/BlogCard";
import Navigation from "../../components/Navigation/Navigation";
import { Link } from "react-router-dom";
import { useState } from "react";

const DashboardBlog = () => {
  const dispatch = useDispatch();
  const { posts, subjects } = useSelector((state) => state);

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");

  useEffect(() => {
    if (subjects.length === 0) {
      dispatch(searchSubjects());
    }
  }, []);
  useEffect(() => {
    dispatch(searchPosts(search, subject));
  }, [search, subject]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const changeSubject = (event) => {
    setSubject(event.target.value);
  };

  return (
    <div>
      <Navigation />
      <h1 className="text-center text-[3rem] font-bold text-titleColor py-5">
        Blog
      </h1>
      <article className="relative flex gap-2 justify-center">
        <input
          className="border-[1px] border-black rounded-sm"
          onChange={handleSearch}
          name="search"
          value={search}
          type="text"
        />
        <select
          onChange={changeSubject}
          className="border-[1px] border-black rounded-sm"
        >
          <option value="all">all</option>
          {subjects?.map((sub) => (
            <option key={sub.id} value={sub.subj}>
              {sub.subj}
            </option>
          ))}
        </select>
        <Link className="pb-1 h-10 absolute top-0 right-60 flex gap-2 items-center text-[1.5rem] text-titleColor border-2 border-titleColor px-2 rounded-md shadow-md hover:bg-titleColor hover:text-white hover:font-bold focus:shadow-xl" to="/add-new-blog">
          <span className="text-[2rem] pb-1">+</span>
          New
        </Link>
      </article>
      <article className="px-60 py-10 flex flex-col gap-4">
        {posts?.map((post) => (
          <BlogCard key={post.id} post={post} subjects={subjects} />
        ))}
      </article>
    </div>
  );
};

export default DashboardBlog;
