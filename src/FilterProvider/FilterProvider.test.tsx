import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import { FilterProvider, useFilter } from ".";

it("renders", () => {
  render(<FilterProvider>Hello, world!</FilterProvider>);
  expect(screen.getByText(/hello, world!/i)).toBeInTheDocument();
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <FilterProvider>{children}</FilterProvider>
);

it("uses the correct initial values", () => {
  const { result } = renderHook(() => useFilter(), { wrapper });
  expect(result.current.filter).toBe("");
});

it("updates the filter", () => {
  const { result } = renderHook(() => useFilter(), { wrapper });
  act(() => {
    result.current.setFilter("test");
  });
  expect(result.current.filter).toBe("test");
});

it("throws an error when rendered outside of a FilterProvider", () => {
  const { result } = renderHook(() => useFilter());
  expect(result.error?.message).toBe(
    "useFilter must be used inside a FilterProvider"
  );
});
