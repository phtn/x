import { render, screen } from "@testing-library/react";
import App from "./App";

test("App renders with Title = x priori", () => {
  const { getByText } = render(<App />);
  expect(getByText("x priori")).toBeInTheDocument();
});
test("App rendered with 3 children", ()=> {
  const app = render(<App/>)
  expect(app.container.children).toHaveLength(3)
})
