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

let navSettings = {
    navExpandedToggle: true,
    navExpandTrigger: 100,
    navMenuButtonToggle: false,
    navExapandable: true,
    navPopMenu: true,
};
if (!document.getElementById("nav-revealed-menu")) navSettings.navPopMenu = false;

window.addEventListener("scroll", () => {
    if (navSettings.navExapandable) dyncamicNavbar();
    if (navSettings.navPopMenu) dynamicMenuButton();
});

function dyncamicNavbar() {
    const navExpandTrigger = navSettings.navExpandTrigger;
    const y = window.scrollY;
    let nav = document.querySelector("nav");
    let navTitle = document.querySelector("#nav-title");

    if (y > navExpandTrigger && navSettings.navExpandedToggle) {
        nav.style.height = "4.5rem";
        navTitle.style.fontSize = "2rem";
        navSettings.navExpandedToggle = false;
    } else if (y < navExpandTrigger && !navSettings.navExpandedToggle) {
        nav.style.height = "8rem";
        navTitle.style.fontSize = "2.5rem";
        navSettings.navExpandedToggle = true;
    }
}

function dynamicMenuButton() {
    const menuTrigger = 400;
    const y = window.scrollY;
    let menu = document.querySelector("#nav-revealed-menu");

    if (y > menuTrigger && navSettings.navMenuButtonToggle) {
        menu.style.left = "0%";
        navSettings.navMenuButtonToggle = false;
    } else if (y < menuTrigger && !navSettings.navMenuButtonToggle) {
        menu.style.left = "100%";
        navSettings.navMenuButtonToggle = true;
    }
}
