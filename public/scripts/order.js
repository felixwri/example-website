class Order {
    constructor(currentOrder, menu) {
        this.orderStarted = new Date();
        this.items = currentOrder;
        this.menu = menu;
        this.total = 0;

        if (this.items.length === 0) {
            let cache = this.getStorage();
            if (cache) {
                this.items = cache.items;
            }
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
        price = price.toString();

        if (price.includes(".")) {
            let pence = price.split(".")[1];

            if (pence.length == 1) {
                return `£${price}0`;
            }
        } else {
            return `£${price}.00`;
        }

        return `£${price}`;
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

    getStorage() {
        let order = localStorage.getItem("order");
        if (!order) return null;

        order = JSON.parse(order);
        return order;
    }

    updateStorage() {
        localStorage.setItem(
            "order",
            JSON.stringify({
                items: this.items,
                quantity: this.length(),
                total: this.totalPrice(),
            })
        );
    }

    clearStorage() {
        localStorage.setItem("order", null);
    }
}

if (typeof module !== "undefined") module.exports = Order;
