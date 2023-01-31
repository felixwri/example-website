const Order = require("../public/scripts/order.js");
const exampleMenu = require("./exampleMenu.js");

// Javascript Jest tests
// With jest installed with 'npm install jest' run the tests with 'npm test'

test("Order object increases in size when item added", () => {
    let order = new Order([], exampleMenu);
    order.addItem(1);
    expect(order.length()).toBe(1);
});

test("Order object increases in size when item removed", () => {
    let order = new Order([], exampleMenu);
    order.addItem(1);
    order.addItem(2);
    order.addItem(4);
    order.removeItem(1);
    expect(order.length()).toBe(2);
});

test("Most recent item can be retrieved", () => {
    let order = new Order([], exampleMenu);
    order.addItem(1);
    expect(order.currentItem()).toBe(exampleMenu[0]);
});

test("Invalid recent item returns empty object with id -1", () => {
    let order = new Order([], exampleMenu);
    expect(order.currentItem()).toStrictEqual({ id: -1, price: 0 });
});
