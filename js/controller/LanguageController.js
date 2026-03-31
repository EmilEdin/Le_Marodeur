// Function to change language
function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang); 
    updateUI();
    
    // Updates menu page
    if (typeof updateMealsDisplay === 'function') {
        updateMealsDisplay();
    }
    
    // Updates order page (NEW)
    if (typeof renderOrder === 'function') {
        renderOrder();
    }
}

// Function to update the text on the page
function updateUI() {
    const lang = localStorage.getItem('selectedLanguage') || 'en';
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        // Use the global 'dictionary' from dictionary.js instead of 'translations'
        if (dictionary[lang] && dictionary[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = dictionary[lang][key];
            } else {
                element.innerText = dictionary[lang][key];
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', updateUI);

// Run on startup
document.addEventListener('DOMContentLoaded', updateUI);