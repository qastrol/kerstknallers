document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.getElementById("navbar");

    // URL naar nav.html
    const navUrl = "./nav.html";

    // Functie om nav.html in te laden
    function loadNav() {
        fetch(navUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Kan nav.html niet laden: " + response.status);
                }
                return response.text();
            })
            .then(data => {
                navContainer.innerHTML = data;
                executeNavScripts(); // Voeg de dark mode logica toe
            })
            .catch(error => {
                console.error("Fout bij het laden van nav.html:", error);
                navContainer.innerHTML = getFallbackNavHTML(); // Gebruik fallback als nav.html niet kan worden geladen
                executeNavScripts(); // Voeg de dark mode logica toe voor fallback
            });
    }

    // Fallback navigatie HTML met de dark mode-knop
    function getFallbackNavHTML() {
        return `
<nav>
    <button class="hamburger" id="hamburger" aria-label="Toggle navigation">
        ☰
    </button>
    <ul>
        <li><a href="kerstknallers.html">Home</a></li>
        <li><a href="alerts.html">Alerts</a></li>
        <li><a href="tts.html">Text-to-Speech</a></li>
        <li><a href="soundeffects.html">Sound Effects</a></li>
        <li>
            <button id="mode-toggle" title="Zet dark mode aan/uit">
                <i id="mode-icon" class="fas fa-sun"></i>
            </button>
        </li>
    </ul>
</nav>

        `;
    }

    function executeNavScripts() {
        const modeToggle = document.getElementById("mode-toggle");
        const modeIcon = document.getElementById("mode-icon");
        const html = document.documentElement;
    
        // Dark mode logica
        const isDarkMode = localStorage.getItem("dark-mode") === "true";
        if (isDarkMode) {
            html.setAttribute("data-theme", "dark");
            modeIcon.classList.replace("fa-sun", "fa-moon");
        } else {
            html.setAttribute("data-theme", "light");
            modeIcon.classList.replace("fa-moon", "fa-sun");
        }
    
        modeToggle.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            html.setAttribute("data-theme", newTheme);
    
            if (newTheme === "dark") {
                modeIcon.classList.replace("fa-sun", "fa-moon");
            } else {
                modeIcon.classList.replace("fa-moon", "fa-sun");
            }
    
            localStorage.setItem("dark-mode", newTheme === "dark");
        });
    
        // Hamburger-menu logica
        const hamburger = document.getElementById("hamburger");
        const navMenu = document.querySelector("nav ul");
    
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }
    

    // Laad de navigatie
    loadNav();
});
