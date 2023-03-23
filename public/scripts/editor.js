let edits = [];
let imageStrings = {};

// This function starts the editing process
async function startEditing() {
    
    // If an order is currently being placed, it cancels the order
    if (currentlyOrdering) cancelOrder();
    const root = document.querySelector(":root");
    root.style.setProperty("--primary", "rgb(255, 60, 34)");

    // Modifies some CSS properties for editing mode
    root.style.setProperty("--edit-icon-width", "2rem");
    root.style.setProperty("--price-margin-right", "1rem");

    // Hides and disables the quick-select-container and relative-container
    document.getElementById("quick-select-container").style.opacity = "0";
    document.getElementById("quick-select-container").style.pointerEvents = "none";
    document.querySelector(".relative-container").style.pointerEvents = "none";
    
    // Changes the margin of main to make room for editing
    document.querySelector("main").style.marginTop = "8rem";

    // Hides the edit button
    let editButton = document.getElementById("edit-menu");
    editButton.style.opacity = "0";
    editButton.style.pointerEvents = "none";

    setTimeout(() => {
        if (document.querySelectorAll(".temporary-item").length === 0) {
            createNewElement("starters");
            createNewElement("mains");
            createNewElement("desserts");
            createNewElement("drinks");
        }
    }, 500);

    document.getElementById("start-order").style.opacity = 0.5;
    document.getElementById("cancel-order").style.opacity = 0;
    
// Sets the editing flag to true
editing = true;
}

// This function checks whether any edits have been made to the order and takes appropriate actions
function checkIfSaved() {

     // If no edits have been made, clears the styles and removes any temporary items
    if (edits.length === 0) {
        clearStyles();
        let temporaryItems = document.querySelectorAll(".temporary-item");
        for (tempItem of temporaryItems) {
            tempItem.remove();
            removeEdit(parseInt(tempItem.dataset.id));
        }
        return;
    }

    // If edits have been made, shows a warning message
    let warning = document.getElementById("fixed-finish");
    warning.style.height = "12rem";
}

// This function saves all the edits made to the order and clears any temporary items
function saveAll() {
    // Removes all the temporary items and their corresponding edits
    let temporaryItems = document.querySelectorAll(".temporary-item");
    for (tempItem of temporaryItems) {
        tempItem.remove();
        removeEdit(parseInt(tempItem.dataset.id));
    }
    // Saves all the edits made to the order
    let allEdits = [...edits];
    for (let edit of allEdits) {
        saveItem(edit);
    }
     // Clears the styles and cancels any ongoing edit   
    clearStyles();
    cancel();
}

// This function resets all unsaved changes made to the order
function resetUnsaved() {
    // Removes all the temporary items and their corresponding edits
    let temporaryItems = document.querySelectorAll(".temporary-item");
    for (tempItem of temporaryItems) {
        tempItem.remove();
        removeEdit(parseInt(tempItem.dataset.id));
    }
    // Resets all unsaved edits made to the order
    let allEdits = [...edits];
    for (let edit of allEdits) {
        resetItem(edit);
    }
     // Clears the styles and cancels any ongoing edit   
    clearStyles();
    cancel();
}

// This function cancels any ongoing edit by hiding the warning message
function cancel() {
    let warning = document.getElementById("fixed-finish");
    warning.style.height = "0rem";
}

// This function clears all the styles applied during the edit mode and restores the default styles
function clearStyles() {
    
    // Restores the edit button styles
    let editButton = document.getElementById("edit-menu");
    editButton.style.opacity = "1";
    editButton.style.pointerEvents = "initial";

    const root = document.querySelector(":root");
    root.style.setProperty("--primary", "rgb(255, 100, 34)");

    root.style.setProperty("--edit-icon-width", "0rem");
    root.style.setProperty("--price-margin-right", "0rem");

    document.getElementById("quick-select-container").style.opacity = "1";
    document.getElementById("quick-select-container").style.pointerEvents = "all";
    document.querySelector(".relative-container").style.pointerEvents = "initial";
    document.querySelector("main").style.marginTop = "16rem";
    hideContext();
    document.getElementById("start-order").style.opacity = 1;
    document.getElementById("cancel-order").style.opacity = 1;
    editing = false;
}

//Function to enable editing of an item's fields
function editItem(id) {
    edits.push(id);
    let { parent, name, price, description, allergens, vegatarian, calories } = getFields(id);

    parent.dataset.editing = "true";

    name.setAttribute("contentEditable", "");
    price.setAttribute("contentEditable", "");
    description.setAttribute("contentEditable", "");
    allergens.setAttribute("contentEditable", "");
    calories.setAttribute("contentEditable", "");

    vegatarian.classList.add("toggle-veg");

    let image = parent.children[0].children[0];
    image.innerHTML = `
        <div class="image-upload-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                <path d="M180 936q-24.75 0-42.375-17.625T120 876V276q0-24.75 17.625-42.375T180 216h409v60H180v600h600V468h60v408q0 24.75-17.625 42.375T780 936H180Zm520-498v-81h-81v-60h81v-81h60v81h81v60h-81v81h-60ZM240 774h480L576 582 449 749l-94-124-115 149Zm-60-498v600-600Z"/>
            </svg>
        </div>
        <input data-id="${id}" type="file" class="image-upload" onchange="updateImage(this, ${id})"/>
    `;

    document.getElementById(`start-${id}`).style.width = "0rem";
    document.getElementById(`save-${id}`).style.width = "2rem";
    document.getElementById(`more-${id}`).style.width = "2rem";
}

// this function allows the upadtes of images within the web server 
function updateImage(element, id) {
    console.log(element.files);
    if (!element.files || !element.files[0]) return;

    let file = element.files[0];

    if (file.size > 1000000) {
        console.log("File too big");
        return;
    }
    if (!file.type.startsWith("image/")) {
        console.log("Not an image");
        return;
    }

    const FR = new FileReader();

    FR.addEventListener("load", function (e) {
        console.log(e);
        element.parentNode.style.backgroundImage = `url(${e.target.result})`;
        imageStrings[id] = e.target.result;
    });

    FR.readAsDataURL(file);
}

// this function save sthe edits made upon differnt elements within the web page
function saveItem(id) {
    let { parent, name, price, description, vegatarian, calories, allergens } = getFields(id);
    let newItem = parent.classList.contains("temporary-item");

    if (newItem) {
        parent.classList.remove("temporary-item");
        createNewElement(parent.parentElement.parentElement.id);
    }

    price = price.innerText.replace("£", "");
    calories = calories.innerText.replace("kcal", "");

    let item = {
        id: id,
        new: newItem,
        name: name.innerText,
        imageURL: parent.dataset.url,
        type: parent.dataset.type,
        price: price,
        description: description.innerText,
        calories: calories,
        vegatarian: vegatarian.dataset.veg === "true",
        allergens: allergens.innerText,
    };

    if (imageStrings[id]) {
        item.dataURL = imageStrings[id];
    }

    console.log(item);
    postSave(item);
}

// this function resets all unsaved chages made to the items
function resetItem(id) {
    console.log("Reset: ", id);
    let { parent, name, price, description, vegatarian, calories, allergens } = getFields(id);

    hideContext();

    let menuItem = null;
    for (let item of menu) {
        if (item.id === id) {
            menuItem = item;
            break;
        }
    }

    console.log(menuItem);

    name.innerText = menuItem.name;
    price.innerText = order.priceToString(menuItem.price);
    description.innerText = menuItem.description;
    vegatarian.dataset.veg = menuItem.vegatarian;
    calories.innerText = menuItem.calories + "kcal";
    allergens.innerText = menuItem.allergies;

    stopEditingItem(id);
}

// funtion allows for the deletion of items on the page
function removeItem(id) {
    console.log("Delete: ", id);
    let { parent } = getFields(id);
    parent.remove();
    removeEdit(id);
    hideContext();
    postDelete(id);
}

function getFields(id) {
    let parent = document.getElementById(`item-${id}`);
    let name = parent.children[1].children[0].children[0].children[0];
    let price = parent.children[1].children[0].children[0].children[1];
    let description = parent.children[1].children[1];
    let allergens = parent.children[1].children[2].children[0];
    let vegatarian = parent.children[1].children[2].children[1];
    let calories = parent.children[1].children[2].children[2];

    return {
        parent: parent,
        name: name,
        price: price,
        description: description,
        allergens: allergens,
        vegatarian: vegatarian,
        calories: calories,
    };
}

function removeEdit(id) {
    const index = edits.indexOf(id);
    if (index > -1) {
        edits.splice(index, 1); // 2nd parameter means remove one item only
    }
}

function stopEditingItem(id) {
    removeEdit(id);
    let { parent, name, price, description, allergens, vegatarian, calories } = getFields(id);

    parent.dataset.editing = "false";

    name.removeAttribute("contentEditable");
    price.removeAttribute("contentEditable");
    description.removeAttribute("contentEditable");
    allergens.removeAttribute("contentEditable");
    calories.removeAttribute("contentEditable");

    vegatarian.classList.remove("toggle-veg");

    let image = parent.children[0].children[0];
    image.innerHTML = ``;

    document.getElementById(`start-${id}`).removeAttribute("style");
    document.getElementById(`save-${id}`).style.width = "0rem";
    document.getElementById(`more-${id}`).style.width = "0rem";
}

// this function allows to toggle specific filters within the menu, for example the vegitarian items
function toggleVegatarian(e) {
    if (edits.length <= 0) return;
    if (e.dataset.veg === "true") {
        e.dataset.veg = "false";
    } else {
        e.dataset.veg = "true";
    }
}

function createNewElement(selector) {
    console.time();
    let parent = document.querySelector(`#${selector}>.food-section`);

    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const temporaryID = array.join();

    let type = "Starters";
    if (selector === "mains") {
        type = "Mains";
    } else if (selector === "desserts") {
        type = "Desserts";
    } else if (selector === "drinks") {
        type = "Drinks";
    }

    parent.innerHTML += `
    <div id="item-${temporaryID}" data-id="${temporaryID}" data-type="${type}" data-url="https://res.cloudinary.com/djukm4fut/image/upload/v1677854073/oaxaca/eiqeecrmuinmlfsimvqz.png" class="menu-item temporary-item">
        <div class="menu-image">
            <div class="image" style="background-image: url(https://res.cloudinary.com/djukm4fut/image/upload/v1677854073/oaxaca/eiqeecrmuinmlfsimvqz.png)"></div>
        </div>
        <div class="menu-text">
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
                        onclick="showContext(this, ${temporaryID})"
                        style="display: none"
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
                <div class="menu-alg empty-alg">Allergens</div>
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
    </div>
    `;
    console.timeEnd();
}

function addNewItem(id) {
    let { parent } = getFields(id);
    let overlay = parent.children[1].children[3];
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = "none";
    editItem(id);
}

let currentFocusedItem = null;

//Shows the hiddent context of the items 
function showContext(element) {
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

//the function allows you to hide the context of the elements
function hideContext(element) {
    let context = document.getElementById("context-menu");
    context.style.opacity = "0";
    context.style.pointerEvents = "none";
    if (element) element.classList.remove("more-items-focused");
    currentFocusedItem = null;
}

function ctxReset() {
    if (!currentFocusedItem) return;
    let id = parseInt(currentFocusedItem.id.split("-")[1]);

    resetItem(id);
}

function ctxRemove() {
    if (!currentFocusedItem) return;
    let id = parseInt(currentFocusedItem.id.split("-")[1]);

    removeItem(id);
}

async function postSave(item) {
    document.getElementById(`save-${item.id}`).style.width = "0rem";
    let sync = document.getElementById(`sync-${item.id}`);
    sync.style.width = "2rem";
    sync.classList.add("spin");

    const response = await fetch(`http://127.0.0.1:5000/staff/menu/add`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    const content = await response.json();
    console.log(content);

    sync.style.width = "0rem";
    sync.classList.remove("spin");

    if (content.success) {
        hideContext();
        stopEditingItem(item.id);
    }
}

async function postDelete(id) {
    const response = await fetch(`http://127.0.0.1:5000/staff/menu/delete`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    });

    const content = await response.json();
    console.log(content);
}
