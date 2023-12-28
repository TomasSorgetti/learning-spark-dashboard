import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import TextEditorButton from "./TextEditorButton";

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "bullet" }],
  [{ color: [] }],
  [{ font: [] }],
];
const module = {
  toolbar: toolbarOptions,
};

const TextEditor = ({ data, setData }) => {
  const [content, setContent] = useState([]);
  const [counter, setCounter] = useState(1);

  const handleAddContent = (newContent) => {
    setContent([...content, newContent]);
  };
  const handleChange = (type) => {
    console.log(data);
    setCounter(counter + 1);
    const newTextKey = `text${counter}`;
    const newImageKey = `image${counter}`;
    const newAltKey = `alt${counter}`;
    if (counter < 8) {
      handleAddContent(
        type === "text" ? (
          <div key={counter}>
            <ReactQuill
              className={`quill w-full mb-20`}
              modules={module}
              theme="snow"
              value={data[newTextKey]}
              onChange={(value) => setData({ ...data, [newTextKey]: value })}
            />
            <input
              className="hidden"
              type="file"
              value={data[newImageKey]}
              onChange={(e) =>
                setData({ ...data, [newImageKey]: e.target.value })
              }
            />
          </div>
        ) : (
          <div key={counter}>
            <ReactQuill
              className={`hidden`}
              modules={module}
              theme="snow"
              value={data[newTextKey]}
              onChange={(value) => setData({ ...data, [[newTextKey]]: value })}
            />
            <div className="w-full flex flex-col items-center gap-1">
              <input
                className="w-[600px] h-[400px] bg-lightGrayColor mb-10"
                type="file"
                value={data[newImageKey]}
                onChange={(e) =>
                  setData({ ...data, [newImageKey]: e.target.value })
                }
              />
              <input
                className="h-6 text-left placeholder:text-lightGrayColor"
                placeholder="Image description...."
                type="text"
                value={data[newAltKey]}
                onChange={(e) =>
                  setData({ ...data, [newAltKey]: e.target.value })
                }
              />
            </div>
          </div>
        )
      );
    }
  };

  return (
    <section className="w-full">
      <article className="flex flex-col gap-16">
        {content.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </article>
      {counter < 7 && <TextEditorButton handleChange={handleChange} />}
    </section>
  );
};

export default TextEditor;
