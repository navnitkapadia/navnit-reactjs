import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders react component", async () => {
  render(
    <Router>
      <App />,
    </Router>
  );
});
