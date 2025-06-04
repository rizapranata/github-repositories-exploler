// src/pages/__tests__/Home.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "../pages/Home";

const mockStore = configureStore([]);
const store = mockStore({
  user: {
    users: [],
    reposByUsername: {},
    loading: false,
    error: null,
  },
});

describe("Home Component", () => {
  test("renders input and search button", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search GitHub username/i);
    const button = screen.getByRole("button", { name: /Search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("can type in input", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search GitHub username/i);
    fireEvent.change(input, { target: { value: "riza" } });

    expect(input).toHaveValue("riza");
  });
});
