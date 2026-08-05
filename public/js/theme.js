const toggle = document.getElementById("themeToggle");

const body = document.body;

const icon = toggle.querySelector("i");

// Load saved theme
if(localStorage.getItem("theme") === "dark"){

    body.classList.add("dark");

    icon.className = "fa-solid fa-sun";

}

toggle.addEventListener("click",()=>{

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){

        icon.className="fa-solid fa-sun";

        localStorage.setItem("theme","dark");

    }else{

        icon.className="fa-solid fa-moon";

        localStorage.setItem("theme","light");

    }

});