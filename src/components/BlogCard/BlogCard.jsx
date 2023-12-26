import { Link } from "react-router-dom";
import deleteImg from "../../assets/cancel.png";

const BlogCard = ({ post, subjects }) => {
  const fecha = new Date(post.createdAt);
  const date = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;

  return (
    <Link
      to={`/blog/${post.id}`}
      className="font-poppins flex gap-6 shadow-lg text-titleColor bg-white hover:text-white hover:bg-subTitleColor px-10 py-6 rounded-md justify-between border-2 border-gray-200"
    >
      <div className="font-semibold w-full overflow-hidden h-5">
        <h3>{post.card_title}</h3>
      </div>
      <div className="text-center w-72 border-x-2 border-titleColor px-5">
        {subjects?.map(
          (subject) => subject.id === post.subjectId && subject.subj
        )}
      </div>
      <p className="w-32 text-center px-5">{date}</p>
    </Link>
  );
};

export default BlogCard;
