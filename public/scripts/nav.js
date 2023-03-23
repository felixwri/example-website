// function to toggle the mobile navigation menu
function toggleMobileNav() {
    let menu = document.getElementById("mobile-nav-menu");
    // check if menu is already open
    if (menu.dataset.open === "true") {
        // close the menu
        menu.style.right = "-12rem";
        menu.dataset.open = "false";
    } else {
        // open the menu
        menu.style.right = "0rem";
        menu.dataset.open = "true";
    }
}

// object to store settings related to the navigation bar
let navSettings = {
    // toggle for whether the navbar is expanded or not
    navExpandedToggle: true,
    // scroll trigger point for expanding the navbar
    navExpandTrigger: 100,
    // toggle for whether the menu button is displayed or not
    navMenuButtonToggle: false,
    // toggle for whether the navbar can be expanded or not
    navExapandable: true,
    // toggle for whether the pop-up menu is available or not
    navPopMenu: true,
};

navInit();

async function navInit() {
    if (!document.getElementById("nav-revealed-menu")) navSettings.navPopMenu = false;

    let order = new Order(null);
    // if there are items in the order, update the basket quantity and total
    if (order.length() > 0) {
        let basketQuantity = document.querySelector(".bq-current");
        let basketTotal = document.querySelector(".bt-current");
        let items = order.getStorage();
        basketQuantity.innerText = items.quantity;
        basketTotal.innerText = order.priceToString(items.total);
    }

    if (order.reference) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/order-status`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ref: order.reference }),
            });

            const content = await response.json();
            console.log(content);
            if (content.success) {
                document.getElementById("status-name").innerText = content.status;
                document.getElementById("basket-ordered").style.opacity = "1";
            }
        } catch (err) {
            console.log(err);
        }
    }
}
// event listener for scrolling, used to dynamically update the navbar and menu button
window.addEventListener("scroll", () => {
    if (navSettings.navExapandable) dyncamicNavbar();
    if (navSettings.navPopMenu) dynamicMenuButton();
});

// function to dynamically update the navbar height and
//title font size based on scroll position
function dyncamicNavbar() {
    const navExpandTrigger = navSettings.navExpandTrigger;
    const y = window.scrollY;
    let nav = document.querySelector("nav");
    let navTitle = document.querySelector("#nav-title");

    if (y > navExpandTrigger && navSettings.navExpandedToggle) {
        // if scroll position is greater than the trigger and the navbar is currently expanded, collapse it
        nav.style.height = "4.5rem";
        navTitle.style.fontSize = "2rem";
        navSettings.navExpandedToggle = false;
    } else if (y < navExpandTrigger && !navSettings.navExpandedToggle) {
        // if scroll position is less than the trigger and the navbar is currently collapsed, expand it
        nav.style.height = "8rem";
        navTitle.style.fontSize = "2.5rem";
        navSettings.navExpandedToggle = true;
    }
}
// function to dynamically update the menu button based on scroll position
function dynamicMenuButton() {
    const menuTrigger = 400;
    const y = window.scrollY;
    let menu = document.querySelector("#nav-revealed-menu");
    let container = document.querySelector("#nav-hidden-menu");

    if (y > menuTrigger && navSettings.navMenuButtonToggle) {
        // if scroll position is greater than the trigger and the menu button is currently hidden, display it
        container.style.width = "4rem";
        menu.style.left = "0%";
        navSettings.navMenuButtonToggle = false;
    } else if (y < menuTrigger && !navSettings.navMenuButtonToggle) {
        // If the scroll position is less than the menuTrigger and the menu button is currently displayed, hide it
        container.style.width = "0rem";
        menu.style.left = "100%";
        navSettings.navMenuButtonToggle = true;
    }
}
