import imageIcon from "../../assets/imageIcon.png";
import textIcon from "../../assets/textIcon.png";

const TextEditorButton = ({ handleChange }) => {
  return (
    <div className="editor_button_handle flex gap-4 ml-[-56px] w-52">
      <div className="text-[2rem] pb-2 h-10 w-10 flex items-center justify-center rounded-full border-2 border-lightGrayColor text-lightGrayColor">
        +
      </div>
      <div className="hidden editor_buttons_cont h-10 w-40 gap-4">
        <button
          className="h-10 w-10 rounded-full border-2 border-lightGrayColor hover:border-titleColor"
          onClick={() => {
            handleChange("image");
          }}
        >
          <img
            className="h-5 px-2"
            src={imageIcon}
            alt="icon to select image"
          />
        </button>
        <button
          className="h-10 w-10 rounded-full border-2 border-lightGrayColor hover:border-titleColor"
          onClick={() => {
            handleChange("text");
          }}
        >
          <img className="h-5 px-2" src={textIcon} alt="icon to select text" />
        </button>
      </div>
    </div>
  );
};

export default TextEditorButton;
