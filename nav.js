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
                <ul>
                    <li><a href="kerstknallers.html">Home</a></li>
                    <li><a href="alerts.html">Alerts</a></li>
                    <li><a href="tts.html">Text-to-Speech</a></li>
                    <li><a href="soundeffects.html">Sound Effects</a></li>
                    <li>
                        <button id="mode-toggle">
                            <i id="mode-icon" class="fas fa-sun"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        `;
    }

    // Functie voor de dark mode wisselknop
    function executeNavScripts() {
        const modeToggle = document.getElementById("mode-toggle");
        const modeIcon = document.getElementById("mode-icon");
        const html = document.documentElement; // Correcte manier om het <html> element te benaderen

        // Haal de opgeslagen dark mode voorkeur op uit localStorage
        const isDarkMode = localStorage.getItem("dark-mode") === "true";
        if (isDarkMode) {
            html.setAttribute("data-theme", "dark");
            modeIcon.classList.remove("fa-sun");
            modeIcon.classList.add("fa-moon");
        } else {
            html.setAttribute("data-theme", "light");
            modeIcon.classList.remove("fa-moon");
            modeIcon.classList.add("fa-sun");
        }

        // Voeg een klikgebeurtenis toe aan de knop
        modeToggle.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            // Wissel het thema
            html.setAttribute("data-theme", newTheme);

            // Pas het icoon aan
            if (newTheme === "dark") {
                modeIcon.classList.remove("fa-sun");
                modeIcon.classList.add("fa-moon");
            } else {
                modeIcon.classList.remove("fa-moon");
                modeIcon.classList.add("fa-sun");
            }

            // Sla de voorkeur op in localStorage zodat de status behouden blijft
            localStorage.setItem("dark-mode", newTheme === "dark");
        });
    }

    // Laad de navigatie
    loadNav();
});
