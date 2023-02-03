let order = new Order(null);

init();
function init() {
    if (order.status === "ordered") {
        showConfirmation(order.getReference());
    }
    let parent = document.getElementById("items");
    if (order.length() === 0) {
        document.getElementById("empty-basket").style.display = "flex";
        document.getElementById(
            "title-hint"
        ).innerHTML = `<span style="color: red">Add an item on the menu to submit an order</span>`;
        document.getElementById("submit-order").style.display = "none";
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
        <div>${order.priceToString(item.price)}</div>
    </div>
    `;
    return node;
}

function scrollToTop() {
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
}

async function showConfirmation(ref) {
    let confirmation = document.getElementById("order-confirmation");
    confirmation.style.height = "12rem";

    let reference = document.getElementById("confirmation-ref");
    reference.innerText = ref;

    document.getElementById("title-hint").style.display = "none";
    let submitButton = document.getElementById("submit-order");
    submitButton.style.opacity = "0";
    submitButton.style.pointerEvents = "none";

    document.querySelector("#pre-order").style.opacity = 0.6;
    scrollToTop();
}

async function getBasket() {
    const response = await fetch('http://localhost:5000/basket');
    const basket = await response.json();
    return basket;
}

async function submitOrder() {
    const basket = getBasket();
    const response = await fetch(`http://localhost:5000/submit_order`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            order: order.getIds(),
        }),
    });

    const content = await response.json();

    if (content.success) {
        showConfirmation(content.reference);
        order.submitted(content.reference);
    }
}
