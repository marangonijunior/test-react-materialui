import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import Booking from "../src/pages/Booking";

describe("<Booking />", () => {
  const render = () => {
    const component = shallow(<Booking />);
    return component;
  };

  it("Should renders the Booking page", () => {
    const component = render();
  });
});
