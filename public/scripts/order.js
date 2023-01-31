class Order {
    constructor(currentOrder, menu) {
        this.orderStarted = new Date();
        this.items = currentOrder;
        this.menu = menu;
        this.total = 0;
    }

    totalPrice() {
        this.total = 0;
        for (let i = 0; i < this.items.length; i++) {
            this.total += this.items[i].price;
        }
        return this.total;
    }

    addItem(id) {
        for (let i = 0; i < this.menu.length; i++) {
            if (this.menu[i].id == id) {
                this.items.push(this.menu[i]);
                break;
            }
        }
    }

    removeItem(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
                break;
            }
        }
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

    length() {
        return this.items.length;
    }
}

if (typeof module !== "undefined") module.exports = Order;
