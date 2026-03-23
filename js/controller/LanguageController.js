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
        modal_title: "The name of the food",
        // New Info Translations
        info_title: "Dietary Information",
        meal_desc_1: "A classic rich and hearty dish made with plant-based ingredients, slow-cooked to perfection.",
        dietary_tags_title: "Dietary & Allergens",
        tag_vegetarian: "Vegetarian",
        tag_gluten_free: "Gluten-Free",
        tag_dairy: "Contains: Dairy"
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
        modal_title: "Namnet på maten",
        // New Info Translations
        info_title: "Kostinformation",
        meal_desc_1: "En klassisk, fyllig och matig rätt gjord på växtbaserade ingredienser, långkokt till perfektion.",
        dietary_tags_title: "Kost & Allergener",
        tag_vegetarian: "Vegetarisk",
        tag_gluten_free: "Glutenfri",
        tag_dairy: "Innehåller: Mejeri"
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
        modal_title: "El nombre de la comida",
        // New Info Translations
        info_title: "Información Dietética",
        meal_desc_1: "Un plato clásico, rico y sustancioso, elaborado con ingredientes de origen vegetal, cocinado a fuego lento a la perfección.",
        dietary_tags_title: "Dieta y Alérgenos",
        tag_vegetarian: "Vegetariano",
        tag_gluten_free: "Sin Gluten",
        tag_dairy: "Contiene: Lácteos"
    }
};

// Function to change language
// TODO: remember the last used, not the current language
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