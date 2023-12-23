import deleteImg from "../../assets/cancel.png";

const BlogCard = ({ post,handleDelete }) => {
  const fecha = new Date(post.createdAt);
  const date = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;


  return (
    <div className="font-poppins flex gap-2 text-white bg-titleColor px-10 py-6 rounded-md justify-between">
      <div className="font-semibold w-full overflow-hidden h-5">
        <h3>{post.card_title}</h3>
      </div>
      <div className="flex justify-between w-60">
        <p className="">{date}</p>
        <button onClick={()=>handleDelete(post.id)}>
          <img className="w-6" src={deleteImg} alt="delete button" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
