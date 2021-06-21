import Card from "./Card";
import { render } from "@testing-library/react";

const config = {
  link: "test link",
  image: "test image",
  title: "test title",
  description: "test description",
};

describe("Card component", () => {
  it("renders with correct config", () => {
    const { getByTestId } = render(<Card {...config} />);

    getByTestId(config.title + "-image");
    getByTestId(config.title);
    getByTestId(config.description);
  });
});
