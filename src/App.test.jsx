import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from './App';

test("renders the student progress dashboard", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Student progress" })).toBeDefined();
  expect(screen.getAllByText("Maya Chen").length).toBeGreaterThan(0);
  expect(screen.getByText("Linear equations quiz")).toBeDefined();
});

test("adds a student to the roster", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "+ Add student" }));
  fireEvent.change(screen.getByLabelText("Student name"), {
    target: { value: "Alex Morgan" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save student" }));

  expect(screen.getAllByText("Alex Morgan").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Not assigned").length).toBeGreaterThan(0);
});
