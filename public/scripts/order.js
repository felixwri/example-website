class Order {
    constructor(menu) {
        this.orderStarted = new Date();

        this.reference = null;
        this.status = null;
        this.items = [];
        this.menu = menu;
        this.total = 0;

        let cache = this.getStorage();
        if (cache) {
            this.items = cache.items;
            this.reference = cache.reference;
            this.status = cache.status;
        }
    }

    totalPrice() {
        this.total = 0;
        for (let i = 0; i < this.items.length; i++) {
            this.total += this.items[i].price;
        }
        return this.total;
    }

    priceToString(price) {
        return new Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(price);
    }

    addItem(id) {
        for (let i = 0; i < this.menu.length; i++) {
            if (this.menu[i].id == id) {
                this.items.push(this.menu[i]);
                this.updateStorage();
                break;
            }
        }
    }

    removeItem(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
                this.updateStorage();
                break;
            }
        }
    }

    getItems() {
        return this.items;
    }
    getIds() {
        let items = [];
        for (let item of this.items) {
            items.push(item.id);
        }
        return items;
    }

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

    clear() {
        this.items = [];
        this.clearStorage();
    }

    length() {
        return this.items.length;
    }

    createStorage() {
        if (this.getStorage()) return;

        localStorage.setItem(
            "order",
            JSON.stringify({
                status: "pending",
                reference: null,
                items: [],
                quantity: 0,
                total: 0,
            })
        );
    }
    submitted(reference) {
        let order = this.getStorage();
        order.status = "ordered";
        order.reference = reference;

        this.status = "ordered";
        this.reference = reference;
        localStorage.setItem("order", JSON.stringify(order));
    }

    getReference() {
        let order = this.getStorage();
        return order.reference;
    }

    getStorage() {
        let order = localStorage.getItem("order");
        if (!order) return null;

        order = JSON.parse(order);
        return order;
    }

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

    clearStorage() {
        localStorage.setItem("order", null);
        console.log("Order cleared");
    }

    log() {
        let order = this.getStorage();
        console.log(order);
    }
}

if (typeof module !== "undefined") module.exports = Order;
