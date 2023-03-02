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

// Case 3: When the user adds an item to the cart, the cart total should update with the new item price.

test('Adding item should update cart total', () => {
  const cart = new Cart();
  const item = new Item('Product 1', 10);
  addToCart(item, cart);
  expect(cart.total).toBe(10);
});


