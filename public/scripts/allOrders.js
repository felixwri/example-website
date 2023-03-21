const StatusTypes = {
    pending: "pending",
    preparing: "preparing",
    ready: "ready",
    delivered: "delivered",
    cancelled: "cancelled",
};

updateTimes();
setInterval(() => {
    updateTimes();
}, 5000);

function updateTimes() {
    let times = document.getElementsByClassName("active-clock");
    let current = new Date();
    for (let time of times) {
        let oldTime = new Date(time.dataset.time);
        let difference = current - oldTime;
        let newTime;
        if (difference > 60 * 60 * 1000 * 24) {
            newTime = "Over a day";
        } else if (difference > 60 * 60 * 1000) {
            let hour = Math.floor(difference / 1000 / 60 / 60);
            newTime = new Intl.DateTimeFormat("en-GB", {
                minute: "2-digit",
                second: "2-digit",
            }).format(difference);
            newTime = hour + ":" + newTime;
        } else {
            newTime = new Intl.DateTimeFormat("en-GB", {
                minute: "2-digit",
                second: "2-digit",
            }).format(difference);
        }

        time.innerText = newTime;
    }
}

function setStaticClocks() {
    let times = document.getElementsByClassName("static-clock");
    for (let time of times) {
        let date = new Date(time.dataset.time);
        let newTime = new Intl.DateTimeFormat("en-GB", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
        time.innerText = newTime;
    }
}
setStaticClocks();

async function changeStatus(id, status) {
    const response = await fetch(`http://127.0.0.1:5000/staff/order-status`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            status: status,
        }),
    });

    const content = await response.json();

    if (content.success) {
        updateOrder(status, id);
    }
}

function updateOrder(status, id) {
    let element = document.getElementById(`id-${id}`);
    let group = element.parentNode.id;

    console.log(status, id, group);

    switch (status) {
        case "pending":
        case "preparing":
        case "ready":
            if (group !== "active-orders") {
                moveElement(id, "active-orders");
            }
            break;
        case "delivered":
            break;
        case "cancelled":
            if (group !== "cancelled-orders") {
                moveElement(id, "cancelled-orders");
            }
            break;

        default:
            break;
    }
}

function moveElement(id, target) {
    let targetElement = document.getElementById(target);
    let movedElement = document.getElementById(`id-${id}`);
    targetElement.appendChild(movedElement);
}

let currentFocusedItem = null;

function showOptions(element, id) {
    if (currentFocusedItem) {
        if (currentFocusedItem.id === element.id) {
            hideContext(element);
            return;
        } else {
            currentFocusedItem.element.classList.remove("more-items-focused");
        }
    }

    let bound = element.getBoundingClientRect();
    let context = document.getElementById("options");

    if (bound.x > window.innerWidth - 200) {
        let contextBound = context.getBoundingClientRect();
        context.style.top = `${bound.y + bound.height + window.scrollY}px`;
        context.style.left = `${bound.x + bound.width - contextBound.width}px`;
    } else {
        context.style.top = `${bound.y + window.scrollY}px`;
        context.style.left = `${bound.x + 50}px`;
    }

    context.dataset.showing = "true";

    element.classList.add("more-items-focused");

    currentFocusedItem = {
        element: element,
        id: id,
    };
}

function hideContext(element) {
    let context = document.getElementById("options");

    context.dataset.showing = "false";
    if (element) element.classList.remove("more-items-focused");
    currentFocusedItem = null;
}

function setStatus(status) {
    let tag = currentFocusedItem.element.parentNode.children[0];
    tag.innerText = status;
    tag.setAttribute(`data-group`, status);

    let ref = currentFocusedItem.element.parentNode.parentNode.children[1].children[1].children[1];
    ref.setAttribute(`data-highlight`, status);

    console.log(currentFocusedItem);
    changeStatus(currentFocusedItem.id, status);
    hideContext(currentFocusedItem.element);
}

document.addEventListener("click", (e) => {
    if (document.querySelector(`[data-showing="true"]`)) {
        if (
            e.target.id !== "options" &&
            e.target.parentNode.id !== "options" &&
            e.target.parentNode.parentNode.id !== "options" &&
            e.target !== currentFocusedItem.element &&
            e.target !== currentFocusedItem.element.children[0]
        ) {
            hideContext(currentFocusedItem.element);
        }
    }
});

function search(e, section) {
    let current = document.querySelector(`[data-found="true"]`);
    if (current) current.dataset.found = "false";
    if (e.value.length < 10) return;

    let children = document.getElementById(section).children;
    if (children.length === 0) return;

    for (let child of children) {
        if (child.dataset.ref === e.value) {
            child.dataset.found = "true";
        }
    }
}
