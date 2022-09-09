import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AddProduct from "../pages/AddProduct";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

test("rendering and submitting a basic Formik form", async () => {
  const handleSubmit = jest.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AddProduct onSubmit={handleSubmit} />
      </BrowserRouter>
    </QueryClientProvider>
  );
  const user = userEvent;
  const name = screen.getByRole("textbox", {
    name: /Product Name/i,
  });
  const description = screen.getByRole("textbox", {
    name: /description/i,
  });
  const avatar = screen.getByRole("textbox", {
    name: /avatar/i,
  });

  const button = screen.getByRole("button", {
    name: /submit/i,
  });

  await user.type(name, "Iphone air");
  await user.type(avatar, "http://facebook.com/");
  await user.type(description, "hello");
  await user.click(button);

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      avatar: "http://facebook.com/",
      name: "Iphone air",
      price: 0,
      category: "-1",
      description: "hello",
      developerEmail: "navnitkapadia@gmail.com",
    })
  );
});
