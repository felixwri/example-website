const StatusTypes = {
    pending: "pending",
    preparing: "preparing",
    ready: "ready",
    delivered: "delivered",
    cancelled: "cancelled",
};

// Call updateTimes() function once and then every 5 seconds to update active clocks on the webpage
updateTimes();
setInterval(() => {
    updateTimes();
}, 5000);

// updates active clocks on the webpage
function updateTimes() {
    let times = document.getElementsByClassName("active-clock");
    let current = new Date();

    // Loop through all active clocks and update their time
    for (let time of times) {

        // Get the old time from the "data-time" attribute
        let oldTime = new Date(time.dataset.time);

        // Calculate the difference between the current time and the old time
        let difference = current - oldTime;
        let newTime;

        // If the difference is more than 24 hours, set the new time to "Over a day"
        if (difference > 60 * 60 * 1000 * 24) {
            newTime = "Over a day";

        } // If the difference is more than 1 hour, format the new time as "HH:MM:SS"
            else if (difference > 60 * 60 * 1000) {
            let hour = Math.floor(difference / 1000 / 60 / 60);
            newTime = new Intl.DateTimeFormat("en-GB", {
                minute: "2-digit",
                second: "2-digit",
            }).format(difference);
            newTime = hour + ":" + newTime;
        } // Otherwise, format the new time as "MM:SS"
        else {
            newTime = new Intl.DateTimeFormat("en-GB", {
                minute: "2-digit",
                second: "2-digit",
            }).format(difference);
        }

        // Set the text of the active clock element to the new time
        time.innerText = newTime;
    }
}

//formatted string representation of the date and time 
// attribute, using the en-GB locale.
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

// takes in two arguments, an id and a status
//It sends a POST request to the server with the id and status in the request body.

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

    //If the success property of the parsed content is true
    //the function calls updateOrder() with the status and id as arguments.
    if (content.success) {
        updateOrder(status, id);
    }
}

//The purpose of this function is to update the order status 
//and move the order element to the appropriate section in the HTML page based on the status.
function updateOrder(status, id) {
    let element = document.getElementById(`id-${id}`);
    let group = element.parentNode.id;

    console.log(status, id, group);

    // switch statement used to handle the different possible order statuses.
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

    // Get the bounds of the element and the context menu
    let bound = element.getBoundingClientRect();
    let context = document.getElementById("options");

    // Position the context menu based on the position of the element
    if (bound.x > window.innerWidth - 200) {
        let contextBound = context.getBoundingClientRect();
        context.style.top = `${bound.y + bound.height + window.scrollY}px`;
        context.style.left = `${bound.x + bound.width - contextBound.width}px`;
    } else {
        context.style.top = `${bound.y + window.scrollY}px`;
        context.style.left = `${bound.x + 50}px`;
    }

    // Set the context menu to be showing and highlight the element that was clicked
    context.dataset.showing = "true";

    element.classList.add("more-items-focused");

    currentFocusedItem = {
        element: element,
        id: id,
    };
}

// This function hides the context menu and removes the focus class from the element, if provided.
function hideContext(element) {
    let context = document.getElementById("options");

    context.dataset.showing = "false";
    if (element) element.classList.remove("more-items-focused");
    currentFocusedItem = null;
}

// This function sets the status of the current focused item.
function setStatus(status) {
    let tag = currentFocusedItem.element.parentNode.children[0];
    
    // Set the innerText of the tag to the provided status and set the `data-group` attribute to the status.
    tag.innerText = status;
    tag.setAttribute(`data-group`, status);

    let ref = currentFocusedItem.element.parentNode.parentNode.children[1].children[1].children[1];
    ref.setAttribute(`data-highlight`, status);

    // Log the currentFocusedItem to the console.
    console.log(currentFocusedItem);
    changeStatus(currentFocusedItem.id, status);
    hideContext(currentFocusedItem.element);
}

document.addEventListener("click", (e) => {
    if (document.querySelector(`[data-showing="true"]`)) {
        
        // If the click is not within the options context menu or on the currently focused item 
        //or its child element, hide the options context menu
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

    // If the search query is less than 10 characters, exit the function
    if (e.value.length < 10) return;

    let children = document.getElementById(section).children;
    if (children.length === 0) return;

    // Loop through each child element and check if its 'data-ref' attribute matches the search query
    for (let child of children) {
        if (child.dataset.ref === e.value) {
            child.dataset.found = "true";
        }
    }
}
