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
    } else if (id === "low-calorie-filter") {
        let menuArray = [];
        for (let item of menu) {
            menuArray.push(item);
        }

        console.log(menuArray);

        let result = menu.sort((a, b) => {
            if (a.calories < b.calories) {
                return -1;
            }
            if (a.calories > b.calories) {
                return 1;
            }
            return 0;
        });

        console.log(result);

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
    } else if (id === "allergy-filter") {
        let inValidIds = [];

        for (let item of menu) {
            if (!(item.allergies === "None" || !item.allergies)) {
                inValidIds.push(item.id);
            }
        }

        for (let i = 0; i < inValidIds.length; i++) {
            let element = document.getElementById(`item-${inValidIds[i]}`);
            if (element) element.style.opacity = "1";
        }
    }
}

function selectFilter(parent) {
    // Unselect previous filter
    let prev = document.querySelector(`[data-selected="true"]`);
    if (prev) {
        prev.dataset.selected = "false";
        removeFilter(parent.id);
    }

    // Set new filter as selected
    let element = parent.children[0];
    // Remove the filter if it is the same as the previous filter
    if (prev === element) {
        removeFilter(parent.id);
    } else {
        element.dataset.selected = "true";
        applyFilter(parent.id);
    }
}
