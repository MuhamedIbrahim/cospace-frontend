import { render, screen } from "@testing-library/react";
import NotFoundPage from "../../components/404/index";

describe("404 Page", () => {
  it("should render 404 code message", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("404"));
  });
});
