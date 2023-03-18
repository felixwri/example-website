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
        document.getElementById("order-payment").style.display = "none";
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
    let submitButton = document.getElementById("order-payment");
    submitButton.style.opacity = "0";
    submitButton.style.pointerEvents = "none";

    document.querySelector("#pre-order").style.opacity = 0.6;
    scrollToTop();
}

async function submitOrder() {
    const basket = order.getIds();
    console.log(basket);
    const response = await fetch(`http://127.0.0.1:5000/submit-order`, {
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

function payment() {
    const paymentBtn = document.getElementById('payment');
    const closeOverlayBtn = document.getElementById('cancel-btn');
    const payBtn = document.getElementById('pay-btn')
    const overlay = document.getElementById('overlay');
    
    paymentBtn.addEventListener('click', function() {
      overlay.style.display = 'block';
    });
    
    closeOverlayBtn.addEventListener('click', function() {
      overlay.style.display = 'none';
    });

    payBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
      });
}
