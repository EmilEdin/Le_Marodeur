// Function to change language
function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang); 
    updateUI();
    
    // Updates menu page
    if (typeof updateMealsDisplay === 'function') {
        updateMealsDisplay();
    }
    
    // Updates order page
    if (typeof renderOrder === 'function') {
        renderOrder();
    }
}

function updateUI() {
    const lang = localStorage.getItem('selectedLanguage') || 'en';
    
    
    const langPicker = document.querySelector('.language-picker select');
    if (langPicker) {
        langPicker.value = lang;
    }
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        
        if (typeof dictionary !== 'undefined' && dictionary[lang] && dictionary[lang][key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = dictionary[lang][key];
            } else {
                element.innerText = dictionary[lang][key];
            }
        }
    });
}

// Run on startup
document.addEventListener('DOMContentLoaded', updateUI);