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
    let parent = document.getElementById(`item-${id}`);
    parent.dataset.editing = "true";
    let name = parent.children[0].children[0].children[0];
    let price = parent.children[0].children[0].children[1];
    let description = parent.children[1];
    name.setAttribute("contentEditable", "");
    price.setAttribute("contentEditable", "");
    description.setAttribute("contentEditable", "");

    document.getElementById(`start-${id}`).style.width = "0rem";
    document.getElementById(`save-${id}`).style.width = "2rem";
    document.getElementById(`reload-${id}`).style.width = "2rem";
}

function saveItem(id) {
    let parent = document.getElementById(`item-${id}`);
    let name = parent.children[0].children[0].children[0];
    let price = parent.children[0].children[0].children[1];
    let description = parent.children[1];

    console.log(name.innerText);
    console.log(price.innerText);
    console.log(description.innerText);
}
