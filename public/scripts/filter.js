// This function takes an id parameter to apply a filter on the menu items.
function applyFilter(id) {
    // If the id is 'veg-filter', find all non-vegetarian items and make them less opaque.
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
    // If the id is 'allergy-filter', find all items with allergy information and make them less opaque.
    } else if (id === "allergy-filter") {
        let inValidIds = [];

        for (let item of menu) {
            if (!(item.allergies === "None" || !item.allergies)) {
                inValidIds.push(item.id);
            }
        }

        for (let i = 0; i < inValidIds.length; i++) {
            let element = document.getElementById(`item-${inValidIds[i]}`);
            if (element) element.style.opacity = "0.2";
        }
    // If the id is 'low-price-filter', sort the menu items by price and rearrange them in the DOM.
    } else if (id === "low-price-filter") {
        let menuArray = [];
        for (let item of menu) {
            menuArray.push(item);
        }

        let result = menu.sort((a, b) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;
        });

        let starters = document.querySelector("#starters > .food-section");
        let mains = document.querySelector("#mains > .food-section");
        let desserts = document.querySelector("#desserts > .food-section");
        let drinks = document.querySelector("#drinks > .food-section");

        for (let i = 0; i < result.length; i++) {
            if (result[i].type === "Starters") {
                starters.appendChild(document.getElementById(`item-${result[i].id}`));
            } else if (result[i].type === "Mains") {
                mains.appendChild(document.getElementById(`item-${result[i].id}`));
            } else if (result[i].type === "Desserts") {
                desserts.appendChild(document.getElementById(`item-${result[i].id}`));
            } else if (result[i].type === "Soft Drinks") {
                drinks.appendChild(document.getElementById(`item-${result[i].id}`));
            }
        }

    // If the id is 'low-calorie-filter', sort the menu items by calories and rearrange them in the DOM.
    } else if (id === "low-calorie-filter") {
        let menuArray = [];
        for (let item of menu) {
            menuArray.push(item);
        }

        let result = menu.sort((a, b) => {
            if (a.calories < b.calories) {
                return -1;
            }
            if (a.calories > b.calories) {
                return 1;
            }
            return 0;
        });

        let starters = document.querySelector("#starters > .food-section");
        let mains = document.querySelector("#mains > .food-section");
        let desserts = document.querySelector("#desserts > .food-section");
        let drinks = document.querySelector("#drinks > .food-section");

        for (let i = 0; i < result.length; i++) {
            if (result[i].type === "Starters") {
                starters.appendChild(document.getElementById(`item-${result[i].id}`));
            } else if (result[i].type === "Mains") {
                mains.appendChild(document.getElementById(`item-${result[i].id}`));
            } else if (result[i].type === "Desserts") {
                desserts.appendChild(document.getElementById(`item-${result[i].id}`));
            } else if (result[i].type === "Soft Drinks") {
                drinks.appendChild(document.getElementById(`item-${result[i].id}`));
            }
        }
    }
}

// This function is used to remove a previously applied filter based on the provided ID.
function removeFilter(id) {
    // Check if the ID matches the "veg-filter" filter
    if (id === "veg-filter") {
        let inValidIds = [];

        // Loop through each menu item and check if it is not vegetarian.
        // If it's not vegetarian, add its ID to the inValidIds array.
        for (let item of menu) {
            if (!item.vegetarian) {
                inValidIds.push(item.id);
            }
        }
        // Loop through the inValidIds array and set the opacity of each menu item with a matching ID to 1.
        for (let i = 0; i < inValidIds.length; i++) {
            let element = document.getElementById(`item-${inValidIds[i]}`);
            if (element) element.style.opacity = "1";
        }
        // Check if the ID matches the "allergy-filter" filter
    } else if (id === "allergy-filter") {
        let inValidIds = [];

        // Loop through each menu item and check if it has allergies.
        // If it has allergies, add its ID to the inValidIds array.
        for (let item of menu) {
            if (!(item.allergies === "None" || !item.allergies)) {
                inValidIds.push(item.id);
            }
        }
        // Loop through the inValidIds array and set the opacity of each menu item with a matching ID to 1.
        for (let i = 0; i < inValidIds.length; i++) {
            let element = document.getElementById(`item-${inValidIds[i]}`);
            if (element) element.style.opacity = "1";
        }
    }
}

let prevSelectedFilter = null;

function selectFilter(parent) {
    // The element which was clicked on
    let element = parent.children[0];

    // Unselect previous filter
    let prev = document.getElementById(prevSelectedFilter);
    if (prev) {
        let prevChild = prev.children[0];
        if (
            prevChild.hasAttribute("data-overwriteable") &&
            element.hasAttribute("data-overwriteable") &&
            prev.id !== parent.id
        ) {
            console.log("here");
            prevChild.dataset.selected = "false";
            removeFilter(parent.id);
            prevSelectedFilter = parent.id;
        } else if (element.dataset.selected === "true") {
            console.log("skipped");
            removeFilter(parent.id);
            element.dataset.selected = "false";
            return;
        }
    }

    // Remove the filter if it is the same as the previous filter
    if (prev === parent && element.dataset.selected === "true") {
        removeFilter(parent.id);
        element.dataset.selected = "false";
        prevSelectedFilter = null;
    } else {
        element.dataset.selected = "true";
        applyFilter(parent.id);
        prevSelectedFilter = parent.id;
    }
}
