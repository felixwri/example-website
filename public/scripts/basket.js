let order = new Order([], null);

init();
function init() {
    let parent = document.getElementById("items");
    if (order.length() === 0) {
        parent.innerText = "Nothing in your basket";
    }

    for (let item of order.getItems()) {
        parent.appendChild(createElement(item));
    }

    document.getElementById("price").innerText = order.priceToString(order.totalPrice());
}

function createElement(item) {
    let node = document.createElement("div");
    node.classList.add("order-item");
    node.innerHTML += `
    <div class="item-title">
        <div>${item.name}</div>
        <div>${item.price}</div>
    </div>
    `;
    return node;
}
