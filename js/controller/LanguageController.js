const translations = {
    en: {
        welcome_title: "Welcome",
        welcome_text: "Scan, order, and enjoy right at your table.",
        view_menu: "View Menu",
        need_help: "Need Help?",
        call_service: "Call Service",
        service_called: "Service has been called. Staff is on the way.",
        cart_empty: "You have not added anything yet",
        category_meals: "Meals",
        meal_1_name: "Pasta Bolognese",
        cart_empty: "You haven't added anything yet",
        modal_title: "The name of the food"
    },
    sv: {
        welcome_title: "Välkommen",
        welcome_text: "Skanna, beställ och njut direkt vid bordet.",
        view_menu: "Visa meny",
        need_help: "Behöver du hjälp?",
        call_service: "Tillkalla personal",
        service_called: "Personal har blivit tillkallad. Personal är på väg.",
        cart_empty: "Du har inte lagt till något ännu",
        category_meals: "Måltider",
        meal_1_name: "Pasta köttfärsås",
        cart_empty: "Du har inte lagt till något ännu",
        modal_title: "Namnet på maten"
    },
    es: {
        welcome_title: "Bienvenido",
        welcome_text: "Escanea, pide y disfruta directamente en tu mesa.",
        view_menu: "Ver menú",
        need_help: "¿Necesitas ayuda?",
        call_service: "Llamar al servicio",
        service_called: "Personal ha sido llamado. Personal está en camino.",
        cart_empty: "Aún no har agregado nada",
        category_meals: "Comidas",
        meal_1_name: "Espaguetis a la boloñesa",
        cart_empty: "Aún no has agregado nada",
        modal_title: "El nombre de la comida"

    }
};

// Function to change language
function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang); // Store the selected language for the entire session
    updateUI();
}

// Function to update the text on the page
function updateUI() {
    const lang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Find all elements with the data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // If it's a button with a specific behavior (like call service)
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerText = translations[lang][key];
            }
        }
    });
}

// Run on startup
document.addEventListener('DOMContentLoaded', updateUI);