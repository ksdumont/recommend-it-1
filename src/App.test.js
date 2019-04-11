import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  const wrapper = shallow(<App />);
  it("header should contain the loading paragraph and h1", () => {
    expect(wrapper.find("header").children().length).toBe(3);
  });
  it("should contain one h1", () => {
    expect(wrapper.find("h1").length).toBe(1);
  });
  it("h1 should say RecommendIt", () => {
    expect(wrapper.find("h1").text()).toBe("RecommendIt");
  });
  it("should contain at least one loading paragraph tag", () => {
    expect(wrapper.find("p.loading").exists()).toBe(true);
  });
  it("p should say Loading", () => {
    expect(wrapper.find("p.loading").text()).toBe("Loading...");
  });

  it("matches the snapshot", () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
