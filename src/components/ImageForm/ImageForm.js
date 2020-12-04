import React from "react";
import "./ImageForm.css";

function ImageForm({ onInputChange, onSubmit,getName }) {
  return (
    <div>
      <p className="f3">
        {
          "Submit an image URL that contains an individuals head in order for our Facial Recognition software to locate a face within the image. As you submit more images the counter will increase."
        }
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <label
            htmlFor="user-img"
            style={{
              color: "white",
              padding: ".3rem",
              display: "flex",
              width: "100%",
            }}
          >
            {" "}
            Insert Image Url:
            <input
              className="f4 pa2 w-70 center"
              type="text"
              name="user-img"
              id="user-img"
              onChange={onInputChange}
            />
          </label>
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageForm;
