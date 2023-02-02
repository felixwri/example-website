let order = new Order(null);

init();
function init() {
    if (order.status === "ordered") {
        showConfirmation(order.getReference());
    }
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

async function submitOrder() {
    const response = await fetch(`http://localhost:5000/basket`, {
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
