import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<Navbar />", () => {
  let history = {
    push: () => true
  };
  const wrapper = shallow(<Navbar history={history} />);

  it("renders", () => {});
});
