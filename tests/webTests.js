//Case 1: Testing a button click for the website

test("clicking button opens menu", () => {
  const { getByText } = render(<MyComponent />);
  const button = getByText("Open Menu");
  fireEvent.click(button);
  expect(getByText("Menu is open")).toBeInTheDocument();
});

////

//Case 2: Testing a page loading up

test("page loads correctly", () => {
  const { getByText } = render(<MyComponent />);
  expect(getByText("Welcome to My Page")).toBeInTheDocument();
});

