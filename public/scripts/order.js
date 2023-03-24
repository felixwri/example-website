class Order {
    constructor(menu) {
        // This constructor method is used to initialize the Order object.
        // It takes a 'menu' parameter, which is an array of menu items.

        // 'orderStarted' is a property that stores the time when the order was started.
        this.orderStarted = new Date();

        // These properties are initialized to null, and will be set later on.

        this.reference = null;

        this.id = null;

        this.status = null;

        // 'items' is an array that will store the items that are added to the order.
        this.items = [];

        // The 'menu' parameter is stored as a property of the object.
        this.menu = menu;

        // 'total' is a property that will store the total price of the order.
        this.total = 0;

        // The following lines of code check if there is an existing order in the browser's local storage.
        // If there is, the order's items, reference, and status are retrieved and stored in the object.
        let cache = this.getStorage();
        if (cache) {
            this.items = cache.items;
            this.reference = cache.reference;
            this.id = cache.id;
            this.status = cache.status;
        }
    }

    // This method calculates the total price of the items in the order.
    totalPrice() {
        this.total = 0;
        for (let i = 0; i < this.items.length; i++) {
            this.total += this.items[i].price;
        }
        return this.total;
    }

    // This method converts a given price to a string format.
    priceToString(price) {
        return new Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(price);
    }

    // This method adds an item to the order.
    addItem(id) {
        for (let i = 0; i < this.menu.length; i++) {
            if (this.menu[i].id == id) {
                this.items.push(this.menu[i]);
                this.updateStorage();
                break;
            }
        }
    }

    // This method removes an item from the order.
    removeItem(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
                this.updateStorage();
                break;
            }
        }
    }

    // This method returns the items in the order.
    getItems() {
        return this.items;
    }

    // This method returns an array of the IDs of the items in the order.
    getIds() {
        let items = [];
        for (let item of this.items) {
            items.push(item.id);
        }
        return items;
    }

    // This method returns the currently selected item in the order.
    currentItem() {
        let current = this.items[this.length() - 1];
        if (current) {
            return current;
        } else {
            return {
                id: -1,
                price: 0.0,
            };
        }
    }

    // This method clears the items in the order and the order from local storage.
    clear() {
        this.items = [];
        this.clearStorage();
    }

    // This method returns the number of items in the order.
    length() {
        return this.items.length;
    }

    // This method creates a new order in local storage.
    createStorage() {
        if (this.getStorage()) return;

        localStorage.setItem(
            "order",
            JSON.stringify({
                status: "pending",
                reference: null,
                id: null,
                items: [],
                quantity: 0,
                total: 0,
            })
        );
    }

    //sets the status and reference of the order to "ordered" and the provided reference, respectively.
    //It updates both the instance variable and the localStorage with the new values.
    submitted(reference, id) {
        let order = this.getStorage();
        order.status = "ordered";
        order.reference = reference;
        order.id = id;

        this.status = "ordered";
        this.reference = reference;
        this.id = id;
        localStorage.setItem("order", JSON.stringify(order));
    }

    //retrieves the reference of the order from the localStorage and returns it.
    getReference() {
        let order = this.getStorage();
        return order.reference;
    }

    //retrieves the order object from the localStorage, parses it as JSON, and returns it.
    //If there is no object in the localStorage, it returns null.
    getStorage() {
        let order = localStorage.getItem("order");
        if (!order) return null;

        order = JSON.parse(order);
        return order;
    }

    //updates the order object in the localStorage with the current instance variables for items, quantity, and total price.
    updateStorage() {
        let object = this.getStorage();

        if (!object) {
            this.createStorage();
            object = this.getStorage();
        }

        object.items = this.items;
        object.quantity = this.length();
        object.total = this.totalPrice();

        localStorage.setItem("order", JSON.stringify(object));
    }

    //sets the order object in the localStorage to null, clearing the localStorage.
    //It also logs a message to the console indicating that the order has been cleared.
    clearStorage() {
        localStorage.setItem("order", null);
        console.log("Order cleared");
    }

    //retrieves the order object from the localStorage and logs it to the console.
    log() {
        let order = this.getStorage();
        console.log(order);
    }
}

//if the module object exists and exports the Order class if it does.
//This allows the module to be imported and used in other JavaScript files.
if (typeof module !== "undefined") module.exports = Order;
