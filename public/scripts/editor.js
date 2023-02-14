let edits = [];

async function startEditing() {
    const root = document.querySelector(":root");
    root.style.setProperty("--primary", "rgb(255, 60, 34)");

    root.style.setProperty("--edit-icon-width", "2rem");
    root.style.setProperty("--price-margin-right", "1rem");

    document.getElementById("quick-select-container").style.opacity = "0";
    document.getElementById("quick-select-container").style.pointerEvents = "none";
    document.querySelector(".relative-container").style.pointerEvents = "none";
    document.querySelector("main").style.marginTop = "8rem";

    let editButton = document.getElementById("edit-menu");
    editButton.style.opacity = "0";
    editButton.style.pointerEvents = "none";

    setTimeout(() => {
        if (document.querySelectorAll(".temporary-item").length === 0) createNewElement();
    }, 500);

    document.getElementById("start-order").style.opacity = 0.5;
    document.getElementById("cancel-order").style.opacity = 0;
    editing = true;
}

function stopEditing() {
    const root = document.querySelector(":root");
    root.style.setProperty("--primary", "rgb(255, 100, 34)");

    root.style.setProperty("--edit-icon-width", "0rem");
    root.style.setProperty("--price-margin-right", "0rem");

    document.getElementById("quick-select-container").style.opacity = "1";
    document.getElementById("quick-select-container").style.pointerEvents = "all";
    document.querySelector(".relative-container").style.pointerEvents = "initial";
    document.querySelector("main").style.marginTop = "16rem";

    let editButton = document.getElementById("edit-menu");
    editButton.style.opacity = "1";
    editButton.style.pointerEvents = "initial";

    let temporaryItems = document.querySelectorAll(".temporary-item");
    for (tempItem of temporaryItems) {
        console.log(tempItem);
        tempItem.remove();
    }

    let allEdits = [...edits];
    for (let edit of allEdits) {
        saveItem(edit);
    }

    hideContext();
    document.getElementById("start-order").style.opacity = 1;
    document.getElementById("cancel-order").style.opacity = 1;
    editing = false;
}

function editItem(id) {
    edits.push(id);
    let { parent, name, price, description, allergans, vegatarian, calories } = getFields(id);

    parent.dataset.editing = "true";

    name.setAttribute("contentEditable", "");
    price.setAttribute("contentEditable", "");
    description.setAttribute("contentEditable", "");
    allergans.setAttribute("contentEditable", "");
    calories.setAttribute("contentEditable", "");

    vegatarian.classList.add("toggle-veg");

    document.getElementById(`start-${id}`).style.width = "0rem";
    document.getElementById(`save-${id}`).style.width = "2rem";
    document.getElementById(`more-${id}`).style.width = "2rem";
}

function saveItem(id) {
    let { parent, name, price, description, calories, allergans } = getFields(id);

    if (parent.classList.contains("temporary-item")) {
        parent.classList.remove("temporary-item");
        createNewElement();
    }

    console.log(name.innerText);
    console.log(price.innerText);
    console.log(description.innerText);
    console.log(calories.innerText);
    console.log(allergans.innerText);

    stopEditingItem(id);
}

function getFields(id) {
    let parent = document.getElementById(`item-${id}`);
    let name = parent.children[0].children[0].children[0];
    let price = parent.children[0].children[0].children[1];
    let description = parent.children[1];
    let allergans = parent.children[2].children[0];
    let vegatarian = parent.children[2].children[1];
    let calories = parent.children[2].children[2];

    return {
        parent: parent,
        name: name,
        price: price,
        description: description,
        allergans: allergans,
        vegatarian: vegatarian,
        calories: calories,
    };
}

function stopEditingItem(id) {
    const index = edits.indexOf(id);
    if (index > -1) {
        edits.splice(index, 1); // 2nd parameter means remove one item only
    }

    let { parent, name, price, description, allergans, vegatarian, calories } = getFields(id);

    parent.dataset.editing = "false";

    name.removeAttribute("contentEditable");
    price.removeAttribute("contentEditable");
    description.removeAttribute("contentEditable");
    allergans.removeAttribute("contentEditable");
    calories.removeAttribute("contentEditable");

    vegatarian.classList.remove("toggle-veg");

    document.getElementById(`start-${id}`).removeAttribute("style");
    document.getElementById(`save-${id}`).style.width = "0rem";
    document.getElementById(`more-${id}`).style.width = "0rem";
}

function toggleVegatarian(e) {
    if (edits.length <= 0) return;
    if (e.dataset.veg === "true") {
        e.dataset.veg = "false";
    } else {
        e.dataset.veg = "true";
    }
}

function createNewElement() {
    console.time();
    let parent = document.querySelector(".food-section");

    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const temporaryID = array.join();

    parent.innerHTML += `
    <div id="item-${temporaryID}" class="menu-item temporary-item">
        <div class="menu-title-container">
            <div class="menu-title">
                <div class="menu-name">Title</div>
                <div class="menu-price">£0.0</div>
            </div>
            <div class="order-counter-container">
                <div class="order-counter">
                    <svg
                        class="order-decrease order-icon no-select"
                        onclick="decreaseCounter(null)"
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        width="48"
                        viewBox="0 0 48 48"
                    >
                        <path
                            d="M14 25.35h20v-3H14ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"
                        />
                    </svg>
                    <div id="quantity-0" class="order-quantity">0</div>
                    <svg
                        class="order-increase order-icon no-select"
                        onclick="increaseCounter(null)"
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        width="48"
                        viewBox="0 0 48 48"
                    >
                        <path
                            d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"
                        />
                    </svg>
                </div>
            </div>
            <div class="edit-item">
                <svg
                    id="start-${temporaryID}"
                    onclick="editItem(${temporaryID})"
                    class="edit-icon start-editing-item"
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    width="48"
                    viewBox="0 0 48 48"
                >
                    <path
                        d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z"
                    />
                </svg>

                <svg
                    id="save-${temporaryID}"
                    onclick="saveItem(${temporaryID})"
                    class="edit-icon save-item"
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    width="48"
                    viewBox="0 0 48 48"
                >
                    <path
                        d="M42 13.85V39q0 1.2-.9 2.1-.9.9-2.1.9H9q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h25.15Zm-3 1.35L32.8 9H9v30h30ZM24 35.75q2.15 0 3.675-1.525T29.2 30.55q0-2.15-1.525-3.675T24 25.35q-2.15 0-3.675 1.525T18.8 30.55q0 2.15 1.525 3.675T24 35.75ZM11.65 18.8h17.9v-7.15h-17.9ZM9 15.2V39 9Z"
                    />
                </svg>

                <svg
                    id="more-${temporaryID}"
                    class="edit-icon more-items"
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    width="48"
                    viewbox="0 0 48 48"
                >
                    <path
                        d="M24 40q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7T24 40Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7T24 8q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Z"
                    />
                </svg>
            </div>
        </div>
        <div class="menu-description">Description</div>
        <div class="menu-extras">
            <div class="menu-alg empty-alg"></div>
            <div onclick="toggleVegatarian(this)" class="menu-veg" data-veg="false">Veg</div>
            <div class="menu-cal">0kcal</div>
        </div>
            
        <div class="create-item-button" onclick="addNewItem(${temporaryID})">
            <svg
                class="order-icon no-select"
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="48"
                viewBox="0 0 48 48"
            >
                <path
                    d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"
                />
            </svg>
            <div>Add item</div>
        </div>        
    </div>
    `;
    console.timeEnd();
}

function addNewItem(id) {
    let { parent } = getFields(id);
    let overlay = parent.children[3];
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = "none";
    editItem(id);
}

let currentFocusedItem = null;

function showContext(element, id) {
    if (currentFocusedItem) {
        if (currentFocusedItem.id === element.id) {
            hideContext(element);
            return;
        } else {
            currentFocusedItem.classList.remove("more-items-focused");
        }
    }

    let bound = element.getBoundingClientRect();
    let context = document.getElementById("context-menu");

    if (bound.x > window.innerWidth - 200) {
        let contextBound = context.getBoundingClientRect();
        context.style.top = `${bound.y + window.scrollY - (contextBound.height + 20)}px`;
        context.style.left = `${bound.x - contextBound.width / 2}px`;
    } else {
        context.style.top = `${bound.y + window.scrollY}px`;
        context.style.left = `${bound.x + 50}px`;
    }

    context.style.opacity = "1";
    context.style.pointerEvents = "all";

    element.classList.add("more-items-focused");
    currentFocusedItem = element;
}

function hideContext(element) {
    let context = document.getElementById("context-menu");
    context.style.opacity = "0";
    context.style.pointerEvents = "none";
    if (element) element.classList.remove("more-items-focused");
    currentFocusedItem = null;
}
