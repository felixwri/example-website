let currentlyOrdering = false;

function startOrder() {
    if (currentlyOrdering) return;

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

    let elements = document.getElementsByClassName("order-counter-container");
    for (element of elements) {
        element.style.width = "0rem";
    }

    document.documentElement.setAttribute("style", "--price-margin-right: 0rem");

    let orderButton = document.getElementById("start-order");
    orderButton.style.opacity = "1";
    orderButton.style.pointerEvents = "all";

    currentlyOrdering = false;
}

function toggleFilters() {
    let e = document.getElementById("filter-container");
    let btn = document.getElementById("filters");
    if (e.dataset.showing === "true") {
        e.dataset.showing = "false";
    } else {
        e.dataset.showing = "true";
    }
}

function selectFilter(parent) {
    // unselect previous filter
    let prev = document.querySelector(`[data-selected="true"]`);
    if (prev) {
        prev.dataset.selected = "false";
        removeFilter(parent.id);
    }

    // set new filter as selected
    let element = parent.children[0];
    // remove the filter if it is the same as the previous filter
    if (prev === element) {
        removeFilter(parent.id);
    } else {
        element.dataset.selected = "true";
        applyFilter(parent.id);
    }
}

function applyFilter(id) {
    if (id === "veg-filter") {
        let inValidIds = [];

        for (let item of menu) {
            if (!item.vegetarian) {
                inValidIds.push(item.id);
            }
        }

        for (let i = 0; i < inValidIds.length; i++) {
            let element = document.getElementById(`item-${inValidIds[i]}`);
            if (element) element.style.opacity = "0.2";
        }
    }
}

function removeFilter(id) {
    if (id === "veg-filter") {
        let inValidIds = [];

        for (let item of menu) {
            if (!item.vegetarian) {
                inValidIds.push(item.id);
            }
        }

        for (let i = 0; i < inValidIds.length; i++) {
            let element = document.getElementById(`item-${inValidIds[i]}`);
            if (element) element.style.opacity = "1";
        }
    }
}

function increaseCounter(id) {
    let counter = document.getElementById(`quantity-${id}`);
    let currentValue = parseInt(counter.innerText);
    currentValue++;
    counter.innerText = currentValue;
}

function decreaseCounter(id) {
    let counter = document.getElementById(`quantity-${id}`);
    let currentValue = parseInt(counter.innerText);
    currentValue--;

    if (currentValue > -1) counter.innerText = currentValue;
}

function scrollToElement(id) {
    const element = document.getElementById(id);

    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
        top: y - 120,
        behavior: "smooth",
    });
}
