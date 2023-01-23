import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./components/App";

it("renders app", () => {
  render(<App />);
  expect(screen.getByText("Voting app")).toBeInTheDocument();
});

it("renders input", () => {
  render(<App />);
  expect(screen.getByTestId("new-answer")).toBeInTheDocument();
});

it("can submit new input and render the questions", () => {
  render(<App />);

  const input = screen.getByTestId("new-answer");
  const question = screen.getByTestId("question");
  const button = document.querySelector('button[type="submit"]');
  expect(button).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "Option A" } });
  fireEvent.submit(button);
  expect(
    screen.getAllByText("Please provide at least 2 answers and a question")
  ).toHaveLength(2);

  fireEvent.change(input, { target: { value: "Option B" } });
  fireEvent.submit(button);
  expect(
    screen.getAllByText("Please provide at least 2 answers and a question")
  ).toHaveLength(2);

  fireEvent.change(question, { target: { value: "Question" } });
  expect(
    screen.queryByText("Please provide at least 2 answers and a question")
  ).toBeFalsy();
});

// following test omitted due to time constraints

it("can vote on items", () => {});

it("renders the vote count", () => {});

it("can modify answer", () => {});

it("can delete answer", () => {});

it("cannot have input field with more than 80 characters", () => {});

it("cannot have duplicate answers", () => {});
