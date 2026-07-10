import darkLogo from "../assets/emblem-colors.png";
import lightLogo from "../assets/emblem-colors-light.png";

const lightbulbOn = 
`<svg xmlns="http://www.w3.org/2000/svg" 
viewBox="0 0 24 24" fill="none" 
stroke="currentColor" 
stroke-width="2" 
stroke-linecap="round" 
stroke-linejoin="round" 
class="lucide lucide-lightbulb-icon lucide-lightbulb">
<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
<path d="M9 18h6"/><path d="M10 22h4"/></svg>`

const lightbulbOff = 
`<svg xmlns="http://www.w3.org/2000/svg" 
width="24" height="24" viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="2" 
stroke-linecap="round" 
stroke-linejoin="round" 
class="lucide lucide-lightbulb-off-icon lucide-lightbulb-off">
<path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5"/>
<path d="m2 2 20 20"/><path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5"/>
<path d="M9 18h6"/><path d="M10 22h4"/></svg>`

const button = document.getElementById("theme-toggle");
const logo =document.getElementById("logo");


console.log("Theme JS loaded");
console.log("Button:", button);
console.log("Logo:", logo);

function setTheme(isDark) {
document.body.classList.toggle("light-theme", isDark)
if (isDark) {;
logo.src = lightLogo;
button.innerHTML = lightbulbOn;
localStorage.setItem("theme", "light")
} else {
logo.src = darkLogo;
button.innerHTML = lightbulbOff;
localStorage.setItem("theme", "dark")
}
}

button.addEventListener("click", () => {
const isDark = !document.body.classList.contains("light-theme");
// Asks is the page dark? or more specifically, does it NOT contain light-theme?
setTheme(isDark);
});

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "light")


// When we click the button, setTheme(isDark) is run. 
// document.body.classList.toggle("light-theme", isDark) then says toggle light-theme depending on the answer of isDark
// If isDark is true (i.e. the page is currently dark), light-theme is applied.
// If isDark is false (i.e. the page is currently light), light-theme is removed.