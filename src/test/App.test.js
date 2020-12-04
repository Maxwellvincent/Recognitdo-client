import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

import Enzyme, { shallow, render, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import ImageForm from "../components/ImageForm/ImageForm";
import Login from "../components/Login/Login";
import Rank from "../components/Rank/Rank";

describe("<App/>", () => {
  it("renders the enzyme correctly", () => {
    const wrapper = shallow(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("Should render the <App /> component", () => {
    const wrapper = render(<App />);
    expect(wrapper);
  });

  it("renders the <ImageForm/>", () => {
    const wrapper = render(<ImageForm />);
    expect(wrapper);
  });

  it("renders the Rank component", () => {
    const user = { name: "drew", entries: 1 };
    const wrapper = render(<Rank user={user} />);
    expect(wrapper);
  });
});

Enzyme.configure({ adapter: new Adapter() });
