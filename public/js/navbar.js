const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const overlay = document.getElementById("menuOverlay");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    menuBtn.classList.toggle("open");

    overlay.classList.toggle("active");

});

overlay.addEventListener("click", () => {

    navbar.classList.remove("active");

    menuBtn.classList.remove("open");

    overlay.classList.remove("active");

});