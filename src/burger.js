///hamburger
let burger = document.querySelector(".header_hamburger")
let mobileMenu = document.querySelector(".header_nav_ul")
let xmark = document.querySelector(".header_x_mark")

burger.addEventListener("click", () => {
    mobileMenu.classList.add("show");
    burger.style.display = "none";
    xmark.style.display = "flex";
})

xmark.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    burger.style.display = "block";
    xmark.style.display = "none";
})

