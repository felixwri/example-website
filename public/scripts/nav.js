function toggleMobileNav() {
    let menu = document.getElementById("mobile-nav-menu");
    if (menu.dataset.open === "true") {
        menu.style.right = "-12rem";
        menu.dataset.open = "false";
    } else {
        menu.style.right = "0rem";
        menu.dataset.open = "true";
    }
}

// determines if the nav bar is expanded or not
let navExpandedToggle = true;
// is the menu button in the nav showing or not
let navMenuButtonToggle = false;

window.addEventListener("scroll", () => {
    console.log("fired");
    dyncamicNavbar();
    dynamicMenuButton();
});

function dyncamicNavbar() {
    const navExpandTrigger = 100;
    const y = window.scrollY;
    let nav = document.querySelector("nav");
    let navTitle = document.querySelector("#nav-title");

    if (y > navExpandTrigger && navExpandedToggle) {
        nav.style.height = "4.5rem";
        navTitle.style.fontSize = "2rem";
        navExpandedToggle = false;
    } else if (y < navExpandTrigger && !navExpandedToggle) {
        nav.style.height = "8rem";
        navTitle.style.fontSize = "2.5rem";
        navExpandedToggle = true;
    }
}

function dynamicMenuButton() {
    const menuTrigger = 400;
    const y = window.scrollY;
    let menu = document.querySelector("#nav-revealed-menu");

    if (y > menuTrigger && navMenuButtonToggle) {
        menu.style.left = "0%";
        navMenuButtonToggle = false;
    } else if (y < menuTrigger && !navMenuButtonToggle) {
        menu.style.left = "100%";
        navMenuButtonToggle = true;
    }
}
