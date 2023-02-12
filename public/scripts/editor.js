let edits = [];

function startEditing() {
    const root = document.querySelector(":root");
    root.style.setProperty("--primary", "rgb(255, 60, 34)");

    root.style.setProperty("--edit-icon-width", "2rem");
    root.style.setProperty("--price-margin-right", "1rem");

    document.getElementById("quick-select-container").style.display = "none";
    document.querySelector(".relative-container").style.pointerEvents = "none";
    document.querySelector("main").style.marginTop = "8rem";

    let editButton = document.getElementById("edit-menu");
    editButton.style.opacity = "0";
    editButton.style.pointerEvents = "none";
}

function stopEditing() {
    const root = document.querySelector(":root");
    root.style.setProperty("--primary", "rgb(255, 100, 34)");

    root.style.setProperty("--edit-icon-width", "0rem");
    root.style.setProperty("--price-margin-right", "0rem");

    document.getElementById("quick-select-container").style.display = "flex";
    document.querySelector(".relative-container").style.pointerEvents = "initial";
    document.querySelector("main").style.marginTop = "16rem";

    let editButton = document.getElementById("edit-menu");
    editButton.style.opacity = "1";
    editButton.style.pointerEvents = "initial";
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
    let { name, price, description, calories, allergans } = getFields(id);

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
