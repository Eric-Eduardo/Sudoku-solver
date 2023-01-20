const btnMode = document.getElementById("btn-mode");
const body = document.getElementsByTagName("body")[0];
var mode = localStorage.getItem("mode") ?? localStorage.setItem("mode", "light");

if (localStorage.getItem("mode") == "dark") body.classList.add("dark-mode");

btnMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (localStorage.getItem("mode")=="light") localStorage.setItem("mode", "dark");
    else localStorage.setItem("mode", "light");
});
