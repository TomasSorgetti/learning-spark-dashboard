import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import ReactQuill from "react-quill";
import axios from "axios";
import { URL_BASE } from "../../utils/url";
import headerImg from "../../assets/blog-header2.png";

const BlogEdit = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const URL = `${URL_BASE}/posts/${id}`;
  const token = localStorage.getItem("token");
  
  const [data, setData] = useState({
    text: "",
    image: null,
    card_image: null,
    card_title: "",
    card_text: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(URL).then((response) => {
          if (response) {
            setData({
              text: response.data.text,
              image: response.data.image,
              card_image: response.data.card_image,
              card_title: response.data.card_title,
              card_text: response.data.card_text,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setData({ ...data, [property]: value });
  };

  const handleSend = async () => {
    const URL = `${URL_BASE}/posts/${id}`;
    if (data.text && data.card_text && data.card_title) {
      try {
        await axios
          .put(URL, data, {
            headers: {
              authorization: `${token}`,
            },
          })
          .then((res) => {
            if (res) navigate("/blog");
          });
      } catch (error) {
        console.log("error at create post", error);
      }
    }
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
            navigate("/blog")
          }
        });
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <Navigation />
      <div className="relative w-full h-[440px] bg-gray-300 mt-[-40px] overflow-hidden">
        <img
          className="object-cover w-full"
          src={data.image ? data.image : headerImg}
          alt="blog image"
        />
        <input
          className="w-full h-full absolute z-10 top-0"
          type="file"
          name="image"
          value={data.image}
        />
      </div>

      <section>
        <ReactQuill
          className="quill"
          theme="snow" // Puedes cambiar el tema según tus preferencias
          value={data.text}
          onChange={(value) => setData({ ...data, text: value })}
        />
      </section>
      <section className="flex gap-20 mt-20">
        <div className="blog-card flex flex-col font-poppins blogCard h-[550px] w-[400px] rounded-[10px] bg-subTitleColor text-white">
          <div className="relative w-full h-[450px] bg-gray-300 overflow-hidden">
            <img
              className="object-cover w-full"
              src={
                data.card_image
                  ? data.card_image
                  : "https://www.timeshighereducation.com/student/sites/default/files/istock-499343530.jpg"
              }
              alt="blog image"
            />
            <input
              className="absolute top-0 w-full h-full"
              type="file"
              name="image"
              onChange={handleChange}
            />
          </div>
          <div className="h-full flex flex-col p-6 justify-between text-titleColor">
            <input
              className="card_title_input h-12 rounded text-[2rem] font-semibold text-center"
              type="text"
              name="card_title"
              value={data.card_title}
              onChange={handleChange}
            />
            <ReactQuill
              className="card-quill bg-white h-32 w-full text-[1rem] font-light text-left cursor-text "
              theme="snow" // Puedes cambiar el tema según tus preferencias
              value={data.card_text}
              onChange={(value) => setData({ ...data, card_text: value })}
            />
            <span className="text-center text-buttonColor font-semibold">
              See more
            </span>
          </div>
        </div>
        <div className="blog-card flex flex-col font-poppins blogCard h-[550px] w-[400px] rounded-[10px] bg-subTitleColor text-white">
          <div className="overflow-hidden w-full h-[450px] rounded-t-[10px]">
            <img
              className="w-full object-cover"
              src={
                data.card_image
                  ? data.card_image
                  : "https://www.timeshighereducation.com/student/sites/default/files/istock-499343530.jpg"
              }
              alt={data.card_title}
            />
          </div>
          <div className="h-full flex flex-col items-center justify-between flex-grow py-4 px-8">
            <h3 className="card_title text-[2rem] font-bold text-center h-24 w-11/12">
              {data.card_title}
            </h3>
            <div
              className="card_preview_text w-full text-[1rem] font-light text-left"
              dangerouslySetInnerHTML={{ __html: data.card_text }}
            />
            <span className="mt-auto text-buttonColor font-semibold">
              See more
            </span>
          </div>
        </div>
      </section>
      <button onClick={handleSend}>Send</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
};

export default BlogEdit;
