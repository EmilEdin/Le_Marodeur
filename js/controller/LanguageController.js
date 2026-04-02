/**
 * LanguageController.js
 * Handles language switching and updating the UI accordingly.
 */

/**
 * Changes the selected application language and triggers UI updates.
 * @param {string} lang - The language code (e.g., 'en', 'sv', 'fr').
 */
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

    if (typeof updateCartSummary === 'function') {
        updateCartSummary();
    }

    if (typeof refreshActiveMealModal === 'function') {
        refreshActiveMealModal();
    }

    if (typeof renderGroupOrderControls === 'function') {
        renderGroupOrderControls();
    }

    if (typeof updateTotals === 'function') {
        updateTotals();
    }
}

/**
 * Updates all UI elements that have a 'data-i18n' attribute
 * with the translation corresponding to the selected language.
 */
function updateUI() {
    const lang = AppUtils.getLanguage();
    
    document.documentElement.lang = lang;
    
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
                element.textContent = dictionary[lang][key];
            }
        }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
        const key = element.getAttribute('data-i18n-aria-label');
        element.setAttribute('aria-label', AppUtils.translate(key, element.getAttribute('aria-label') || ''));
    });
}

// Run on startup
document.addEventListener('DOMContentLoaded', updateUI);
