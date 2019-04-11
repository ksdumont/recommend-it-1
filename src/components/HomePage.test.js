import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<HomePage />", () => {
  const wrapper = shallow(<HomePage test="testing prop" />);

  it("Navbar tag renders", () => {
    expect(wrapper.find("Navbar").exists()).toBe(true);
  });
  it("Navbar renders with props", () => {
    expect(wrapper.find('[test="testing prop"]').exists()).toBe(true);
  });
  it("Element with container class", () => {
    expect(wrapper.find({ className: "container" }).exists()).toBe(true);
  });
});
