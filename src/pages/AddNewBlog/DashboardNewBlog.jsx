import axios from "axios";
import { useState } from "react";
import { URL_BASE } from "../../utils/url";
import Navigation from "../../components/Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchSubjects } from "../../redux/actions";
import TextEditor from "../../components/TextEditor/TextEditor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MetaBlogMenu from "../../components/MetaBlogMenu/MetaBlogMenu";

const DashboardNewBlog = () => {
  const dispatch = useDispatch();
  const { subjects } = useSelector((state) => state);
  useEffect(() => {
    if (subjects.length === 0) {
      dispatch(searchSubjects());
    }
  }, []);
  const [data, setData] = useState({
    //************* Header ***************//
    image: null,
    header_image_alt: "",
    title: "",
    writer: "",
    //************* Blog ***************//
    text1: "",
    image1: null,
    alt1: null,
    text2: "",
    image2: null,
    alt2: null,
    text3: "",
    image3: null,
    alt3: null,
    text4: "",
    image4: null,
    alt4: null,
    text5: "",
    image5: null,
    alt5: null,
    text6: "",
    image6: null,
    alt6: null,
    //************* Card ***************//
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
  return (
    <section className="flex flex-col items-center w-full mb-20">
      <Navigation />
      <section className="flex flex-col w-full">
        {/* header image & alt */}
        <input
          className="w-full h-[440px] bg-gray-300"
          type="file"
          name="image"
          value={data.image}
        />
        <div className="w-full flex gap-2 justify-start mb-10 mt-2">
          <input
            className="h-6 text-left"
            type="text"
            name="header_image_alt"
            placeholder="Image description....."
            value={data.header_image_alt}
            onChange={handleChange}
          />
        </div>
        <section className="w-full flex justify-between">
          <article className="w-full px-20 flex flex-col items-center">
            {/* title */}
            <input
              className="h-16 placeholder:text-lightGrayColor placeholder:font-medium mb-20 text-[3rem] font-extrabold text-titleColor font-poppins text-center"
              type="text"
              name="title"
              placeholder="Title..."
              value={data.title}
              onChange={handleChange}
            />
            {/* subtitle */}
            <div className="w-full flex justify-start">
              <input
                className="h-10 mb-20 text-[1.5rem] font-bold font-manrope text-titleColor text-left"
                type="text"
                name="writer"
                placeholder="John Doe"
                value={data.writer}
                onChange={handleChange}
              />
            </div>
            {/* text editor */}
            <div className="w-full flex flex-col gap-4 items-center">
              <TextEditor data={data} setData={setData} />
            </div>
            {/* card */}
            <div className="flex gap-20 mt-32 pt-32 border-t-2 border-gray-200">
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
            </div>
          </article>
          <MetaBlogMenu handleSend={handleSend} />
        </section>
      </section>
    </section>
  );
};

export default DashboardNewBlog;
