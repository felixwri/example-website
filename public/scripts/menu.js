let currentlyOrdering = false;

const order = new Order(menu);

init();

function init() {
    if (order.status) {
        increaseQuantity();
        increasePrice();
        startOrder();

        for (let item of order.getItems()) {
            setCounter(item.id, 1);
        }
    }
}

function startOrder() {
    if (currentlyOrdering) return;
    order.createStorage();

    // Set the styles of the page when the start order button is pressed
    let elements = document.getElementsByClassName("order-counter-container");
    for (element of elements) {
        element.style.width = "6rem";
    }

    document.documentElement.setAttribute("style", "--price-margin-right: 0.5rem");

    let orderButton = document.getElementById("start-order");
    orderButton.style.opacity = "0";
    orderButton.style.pointerEvents = "none";

    currentlyOrdering = true;
}

function cancelOrder() {
    if (!currentlyOrdering) return;

    // Remove styles and clear all data from the counters and local storge
    let elements = document.getElementsByClassName("order-counter-container");
    for (element of elements) {
        element.style.width = "0rem";
    }

    order.clear();
    clearCounters();
    decreaseQuantity();
    decreasePrice();

    document.documentElement.setAttribute("style", "--price-margin-right: 0rem");

    let orderButton = document.getElementById("start-order");
    orderButton.style.opacity = "1";
    orderButton.style.pointerEvents = "all";

    currentlyOrdering = false;
}

function toggleFilters() {
    // Shows the filter drop down menu
    let e = document.getElementById("filter-container");
    if (e.dataset.showing === "true") {
        e.dataset.showing = "false";
    } else {
        e.dataset.showing = "true";
    }
}

function setCounter(id, amount) {
    let counter = document.getElementById(`quantity-${id}`);
    let currentValue = parseInt(counter.innerText);

    if (currentValue + amount < 0) return false;

    currentValue += amount;
    counter.innerText = currentValue;

    return true;
}

function clearCounters() {
    let counters = document.getElementsByClassName("order-quantity");
    for (counter of counters) {
        counter.innerText = 0;
    }
}

function increaseCounter(id) {
    setCounter(id, 1);
    order.addItem(id);

    increaseQuantity();
    increasePrice();
}

function decreaseCounter(id) {
    if (!setCounter(id, -1)) return;

    order.removeItem(id);

    decreaseQuantity();
    decreasePrice();
}

function increaseQuantity() {
    let targetAmount = order.length();
    // transition in queued element
    let element = document.querySelector(`.bq-higher`);
    element.innerText = targetAmount;
    element.style.top = "0%";

    // transition out current
    let current = document.querySelector(`.bq-current`);
    current.style.top = "100%";
    current.classList.remove("bq-current");

    setTimeout(() => {
        current.remove();
    }, 1000);

    // create next element for the queue
    let node = document.createElement("div");
    node.classList.add("bq-value");
    node.classList.add("bq-higher");

    node.innerText = targetAmount + 1;
    let parent = current.parentNode;

    parent.insertBefore(node, current);

    // update classes of transitioned elements
    element.classList.remove("bq-higher");
    element.classList.add("bq-current");
}

function increasePrice() {
    let targetPrice = order.totalPrice();
    // transition in queued element
    let element = document.querySelector(`.bt-higher`);

    element.innerText = order.priceToString(targetPrice);

    element.style.top = "0%";

    // transition out current
    let current = document.querySelector(`.bt-current`);
    current.style.top = "100%";
    current.classList.remove("bt-current");

    setTimeout(() => {
        current.remove();
    }, 1000);

    // create next element for the queue
    let node = document.createElement("div");
    node.classList.add("bt-value");
    node.classList.add("bt-higher");

    node.innerText = "pend";
    node.dataset.price = "pending";
    let parent = current.parentNode;

    parent.insertBefore(node, current);

    // update classes of transitioned elements
    element.classList.remove("bt-higher");
    element.classList.add("bt-current");
}

function decreaseQuantity() {
    let targetAmount = order.length();
    // transition in queued element
    let element = document.querySelector(`.bq-lower`);
    element.style.top = "0%";
    element.innerText = targetAmount;

    // transition out current
    let current = document.querySelector(`.bq-current`);
    current.style.top = "-100%";
    current.classList.remove("bq-current");

    let node = document.createElement("div");
    node.classList.add("bq-value");
    node.classList.add("bq-lower");
    let parent = current.parentNode;

    parent.insertBefore(node, current);

    setTimeout(() => {
        current.remove();
    }, 1000);

    // update classes of transitioned elements
    element.classList.remove("bq-lower");
    element.classList.add("bq-current");
}

function decreasePrice() {
    let targetPrice = order.totalPrice();
    // transition in queued element
    let element = document.querySelector(`.bt-lower`);
    element.style.top = "0%";

    element.innerText = order.priceToString(targetPrice);

    // transition out current
    let current = document.querySelector(`.bt-current`);
    current.style.top = "-100%";
    current.classList.remove("bt-current");

    setTimeout(() => {
        current.remove();
    }, 1000);

    // create next element for the queue
    let node = document.createElement("div");
    node.classList.add("bt-value");
    node.classList.add("bt-lower");

    node.innerText = "pend";
    let parent = current.parentNode;

    parent.insertBefore(node, current);

    // update classes of transitioned elements
    element.classList.remove("bt-lower");
    element.classList.add("bt-current");
}

function scrollToElement(id) {
    const element = document.getElementById(id);

    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
        top: y - 120,
        behavior: "smooth",
    });
}
