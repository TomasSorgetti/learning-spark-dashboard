import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { URL_BASE } from "../../utils/url";
import Navigation from "../../components/Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchSubjects } from "../../redux/actions";

const DashboardNewBlog = () => {
  const dispatch = useDispatch();
  const { subjects } = useSelector((state) => state);
  useEffect(() => {
    if (subjects.length === 0) {
      dispatch(searchSubjects());
    }
  }, []);

  const [middleEditor, setMiddleEditor] = useState(false);
  const [middleImage, setMiddleImage] = useState(false);
  const [finalEditor, setFinalEditor] = useState(false);
  const [finalImage, setFinalImage] = useState(false);

  const [data, setData] = useState({
    image: null,
    header_image_alt: "",
    title: "",
    writer: "",
    text: "",
    middle_image: "",
    middle_text: "",
    final_image: "",
    final_text: "",
    card_image: null,
    card_title: "",
    card_text: "",
    subj: "mathematics aa",
  });
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setData({ ...data, [property]: value });
  };
  const token = localStorage.getItem("token");
  const handleSend = async () => {
    const URL = `${URL_BASE}/posts`;
    if (data.text && data.card_text && data.card_title) {
      try {
        await axios
          .post(URL, data, {
            headers: {
              authorization: `${token}`,
            },
          })
          .then((res) => {
            console.log(res);
          });
      } catch (error) {
        console.log("error at create post", error);
      }
    }
  };

  const changeSubject = (event) => {
    setData((prevData) => ({
      ...prevData,
      subj: event.target.value,
    }));
  };

  const handleMiddleImage = () => {
    setMiddleImage(true);
  };
  const handleMiddleText = () => {
    setMiddleEditor(true);
  };
  const handleFinalImage = () => {
    setFinalImage(true);
  };
  const handleFinalText = () => {
    setFinalEditor(true);
  };

  const handleDelete = (prop) => {
    if (prop === "middleImage") {
      setMiddleImage(false);
      setMiddleEditor(false);
      setFinalImage(false);
      setFinalEditor(false);
      setData((prevData) => ({
        ...prevData,
        middle_image: "",
        middle_text: "",
        final_text: "",
        final_image: "",
      }));
    }
    if (prop === "middleEditor") {
      setMiddleEditor(false);
      setFinalImage(false);
      setFinalEditor(false);
      setData((prevData) => ({
        ...prevData,
        middle_text: "",
        final_text: "",
        final_image: "",
      }));
    }
    if (prop === "finalImage") {
      setFinalImage(false);
      setFinalEditor(false);
      setData((prevData) => ({
        ...prevData,
        final_text: "",
        final_image: "",
      }));
    }
    if (prop === "finalEditor") {
      setFinalEditor(false);
      setData((prevData) => ({
        ...prevData,
        final_text: "",
      }));
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Navigation />
      <input
        className="w-full h-[440px] bg-gray-300"
        type="file"
        name="image"
        value={data.image}
      />
      <div className="w-full flex gap-2 justify-start mb-10 mt-2">
        <label>Header Alt:</label>
        <input
          className="h-6 text-left border-2 border-subTitleColor"
          type="text"
          name="header_image_alt"
          placeholder="Image description....."
          value={data.header_image_alt}
          onChange={handleChange}
        />
      </div>
      <input
        className="h-16 mb-20 text-[3rem] font-extrabold text-titleColor font-poppins text-center border-2 border-subTitleColor"
        type="text"
        name="title"
        placeholder="Title..."
        value={data.title}
        onChange={handleChange}
      />
      <div className="w-full px-32 flex justify-start">
        <input
          className="h-10 mb-20 text-[1.5rem] font-bold font-manrope text-titleColor text-left border-2 border-subTitleColor"
          type="text"
          name="writer"
          placeholder="John Doe"
          value={data.writer}
          onChange={handleChange}
        />
      </div>
      <section className="w-full px-32 flex flex-col gap-4 items-center">
        <ReactQuill
          className="quill w-full"
          theme="snow" // Puedes cambiar el tema según tus preferencias
          value={data.text}
          onChange={(value) => setData({ ...data, text: value })}
        />
        <div className="w-full relative flex justify-center">
          <button
            className={`${
              middleImage ? "" : "hidden"
            } absolute top-32 right-[-70px] text-red-700 text-[3rem]`}
            onClick={() => handleDelete("middleImage")}
          >
            x
          </button>
          <input
            className={`${
              middleImage ? "" : "hidden"
            } mt-10 w-[800px] h-[600px] bg-gray-300`}
            type="file"
            name="middle_image"
            value={data.middle_image}
          />
        </div>
        <div className="w-full relative">
          <button
            className={`${
              middleEditor ? "" : "hidden"
            } absolute top-32 right-[-70px] text-red-700 text-[3rem]`}
            onClick={() => handleDelete("middleEditor")}
          >
            x
          </button>
          <ReactQuill
            className={`${middleEditor ? "" : "hidden"} quill w-full`}
            theme="snow" // Puedes cambiar el tema según tus preferencias
            value={data.middle_text}
            onChange={(value) => setData({ ...data, middle_text: value })}
          />
        </div>
        <div className="w-full relative flex justify-center">
          <button
            className={`${
              finalImage ? "" : "hidden"
            } absolute top-32 right-[-70px] text-red-700 text-[3rem]`}
            onClick={() => handleDelete("finalImage")}
          >
            x
          </button>
          <input
            className={`${
              finalImage ? "" : "hidden"
            } mt-10 w-[800px] h-[600px] bg-gray-300`}
            type="file"
            name="final_image"
            value={data.final_image}
          />
        </div>
        <div className="w-full relative">
          <button
            className={`${
              finalEditor ? "" : "hidden"
            } absolute top-32 right-[-70px] text-red-700 text-[3rem]`}
            onClick={() => handleDelete("finalEditor")}
          >
            x
          </button>
          <ReactQuill
            className={`${finalEditor ? "" : "hidden"} quill w-full`}
            theme="snow" // Puedes cambiar el tema según tus preferencias
            value={data.final_text}
            onChange={(value) => setData({ ...data, final_text: value })}
          />
        </div>
        <div className="flex gap-2 mt-20">
          <button
            onClick={handleMiddleImage}
            className={`${
              middleImage ? "hidden" : ""
            } cursor-pointer bg-gray-400`}
          >
            Add Image
          </button>
          <button
            onClick={handleMiddleText}
            className={`${
              middleEditor ? "hidden" : ""
            } cursor-pointer bg-gray-400`}
          >
            Add Text
          </button>
          <button
            onClick={handleFinalImage}
            className={`${
              finalImage || (middleImage && middleEditor) ? "" : "hidden"
            } ${finalImage ? "hidden" : ""} cursor-pointer bg-gray-400`}
          >
            Add Image2
          </button>
          <button
            onClick={handleFinalText}
            className={`${
              finalEditor || (middleImage && middleEditor) ? "" : "hidden"
            } ${finalEditor ? "hidden" : ""} cursor-pointer bg-gray-400`}
          >
            Add Text2
          </button>
        </div>
      </section>

      <section className="flex gap-20 mt-32 pt-32 border-t-2 border-gray-200">
        {/* edit card */}
        <div className="blog-card flex flex-col font-poppins blogCard h-[550px] w-[400px] rounded-[10px] bg-white text-titleColor shadow-xl">
          <div className="w-full h-[227px] ">
            <input
              className="w-full h-[227px] bg-gray-300 flex items-center justify-center rounded-t-xl"
              type="file"
              name="image"
              value={data.image}
              onChange={handleChange}
            />
          </div>
          <div className="card-quill-container h-full flex flex-col px-6 py-4 justify-between text-titleColor">
            <select
              onChange={changeSubject}
              className="border-[1px] w-40 mb-4 border-black rounded-sm cursor-pointer"
            >
              {subjects?.map((sub) => (
                <option key={sub.id} value={sub.subj}>
                  {sub.subj}
                </option>
              ))}
            </select>
            <input
              className="card_title_input h-12 rounded text-[2rem] font-semibold text-left border-2 border-subTitleColor"
              type="text"
              name="card_title"
              placeholder="Title"
              value={data.card_title}
              onChange={handleChange}
            />
            <ReactQuill
              className="card-quill mt-2 border-t-2 border-gray-200 bg-white cursor-text font-manrope w-full text-[1rem] font-light text-left text-subTitleColor"
              theme="snow"
              value={data.card_text}
              onChange={(value) => setData({ ...data, card_text: value })}
            />
            <span className="mt-auto text-titleColor font-semibold w-full text-left pb-4">
              Read post
            </span>
          </div>
        </div>

        {/* preview card */}
        <div className="blog-card flex flex-col font-poppins blogCard h-[550px] w-[400px] rounded-[10px] bg-white text-subTitleColor shadow-xl">
          <div className="overflow-hidden w-full h-[227px] rounded-t-xl">
            <img
              className="w-full object-cover h-full"
              src={
                data.card_image
                  ? data.card_image
                  : "https://www.timeshighereducation.com/student/sites/default/files/istock-499343530.jpg"
              }
              alt={data.card_title}
            />
          </div>
          <div className="flex flex-col items-center justify-between flex-grow py-4 px-8 text-left">
            <div className="w-full flex justify-start">
              <span className="text-[1rem] rounded-full w-auto h-auto px-3 py-1 bg-buttonColor text-white text-center font-bold">
                {data.subj}
              </span>
            </div>
            <h3 className="text-titleColor text-[2rem] h-16 font-bold w-full py-2">
              {data.card_title}
            </h3>
            <div
              className="card_preview_text font-manrope w-full text-[1rem] font-light text-left text-subTitleColor"
              dangerouslySetInnerHTML={{ __html: data.card_text }}
            />
            <span className="mt-auto text-titleColor font-semibold w-full text-left pb-4">
              Read post
            </span>
          </div>
        </div>
      </section>
      <button
        className="mt-10 mb-20 text-[1.5rem] text-titleColor border-2 border-titleColor px-4 py-2 rounded-md shadow-md hover:bg-titleColor hover:text-white hover:font-bold focus:shadow-xl"
        onClick={handleSend}
      >
        Upload
      </button>
    </div>
  );
};

export default DashboardNewBlog;
