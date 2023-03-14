let order = new Order(null);

init();
// This function checks the status of the order, displays a confirmation message if it has been ordered,
// and dynamically updates the HTML content of the page based on the contents of the order
function init() {
    if (order.status === "ordered") {
        showConfirmation(order.getReference());
    }

    // Get the parent HTML element for the items
    let parent = document.getElementById("items");

    // Check if the order is empty and update the page accordingly
    if (order.length() === 0) {
        document.getElementById("empty-basket").style.display = "flex";
        document.getElementById(
            "title-hint"
        ).innerHTML = `<span style="color: red">Add an item on the menu to submit an order</span>`;
        document.getElementById("submit-order").style.display = "none";
    }

    // Create an HTML element for each item in the order and append it to the parent element
    for (let item of order.getItems()) {
        parent.appendChild(createElement(item));
    }

    // Update the price displayed on the page with the total price of the order
    document.getElementById("price").innerText = order.priceToString(order.totalPrice());
}

// This function creates an HTML element for a single item in the order
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

// This function scrolls the window to the top of the page
function scrollToTop() {
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
}

// This function displays the order confirmation message and updates the HTML content of the page accordingly
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

// This function sends a POST request to submit the order to the server and
// displays a confirmation message if successful
async function submitOrder() {
    const basket = order.getIds();
    console.log(basket);
    const response = await fetch(`http://localhost:5000/submit-order`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            basket: basket,
        }),
    });

    const content = await response.json();

    if (content.success) {
        showConfirmation(content.reference);
    }
}
