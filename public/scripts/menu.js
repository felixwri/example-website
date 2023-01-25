let currentlyOrdering = false;

function startOrder() {
    if (currentlyOrdering) return;

    let elements = document.getElementsByClassName("order-counter-container");
    for (element of elements) {
        element.style.width = "6rem";
    }

    let orderButton = document.getElementById("start-order");
    orderButton.style.opacity = "0";
    orderButton.style.pointerEvents = "none";

    currentlyOrdering = true;
}

function cancelOrder() {
    if (!currentlyOrdering) return;

    let elements = document.getElementsByClassName("order-counter-container");
    for (element of elements) {
        element.style.width = "0rem";
    }

    let orderButton = document.getElementById("start-order");
    orderButton.style.opacity = "1";
    orderButton.style.pointerEvents = "all";

    currentlyOrdering = false;
}
