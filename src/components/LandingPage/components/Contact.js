import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container bg-grey">
      <span className="div-title">Contact us</span>
      <div className="contact-form">
        <div id="sect1">
          <span>Contact us and we will get back to you within 24 hours.</span>
          {/* <span>
                        <i className="fas fa-map-marker-alt"></i>
                        Kampala Uganda
                    </span> */}
          <span>
            <i className="fas fa-mobile-alt"></i>
            +256 778 800 900
          </span>
          <span>
            <i className="far fa-envelope"></i>
            notegenix.gmail.com
          </span>
        </div>

        <div id="sect2">
          <span>Contact</span>

          <input
            type="text"
            placeholder="email address"
            className="input-field"
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="comment"
          ></textarea>
          <button className="contact-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
