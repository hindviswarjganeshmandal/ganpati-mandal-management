document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (!menuBtn || !navbar) {
        console.log("Navbar elements not found");
        return;
    }

    menuBtn.addEventListener("click", function () {
        navbar.classList.toggle("active");
        console.log("Menu clicked");
    });

});