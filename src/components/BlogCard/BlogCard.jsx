import { Link } from "react-router-dom";
import deleteImg from "../../assets/cancel.png";

const BlogCard = ({ post }) => {
  const fecha = new Date(post.createdAt);
  const date = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;

  return (
    <Link
      to={`/blog/${post.id}`}
      className="font-poppins flex gap-2 text-white bg-titleColor hover:bg-subTitleColor px-10 py-6 rounded-md justify-between"
    >
      <div className="font-semibold w-full overflow-hidden h-5">
        <h3>{post.card_title}</h3>
      </div>
      <p className="">{date}</p>
    </Link>
  );
};

export default BlogCard;
