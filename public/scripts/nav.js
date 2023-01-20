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

window.addEventListener("scroll", () => {
    const navExpandTrigger = 100;
    const y = window.scrollY;
    let nav = document.querySelector("nav");

    if (y > navExpandTrigger && navExpandedToggle) {
        nav.style.height = "4rem";
        navExpandedToggle = false;
    } else if (y < navExpandTrigger && !navExpandedToggle) {
        nav.style.height = "8rem";
        navExpandedToggle = true;
    }
});
