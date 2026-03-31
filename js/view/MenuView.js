/**
 * MenuView.js
 * Handles the rendering of the menu items and categories with modern classes.
 */
class MenuView {
    static renderCategories(categories, activeCategoryId) {
        const container = document.getElementById('category-list');
        if (!container) return;
        
        container.innerHTML = categories.map(cat => {
            // Dynamically assign the images based on category
            let imgSrc = '../assets/images/appetizer.jpg'; // Default for most meals
            if (cat.id === 'desserts') imgSrc = '../assets/images/dessert.jpg';
            if (cat.id === 'beverages') imgSrc = '../assets/images/wine.jpg';

            return `
            <li class="category-item ${cat.id === activeCategoryId ? 'active' : ''}" data-category-id="${cat.id}">
                <button type="button" class="category-btn">
                    <img src="${imgSrc}" alt="" class="category-img">
                    <span class="category-name" data-i18n="${cat.i18n}">${cat.defaultName}</span>
                </button>
            </li>
            `;
        }).join('');
        
        
        if (typeof updateUI === 'function') updateUI();
    }

    static renderMeals(meals) {
        const container = document.getElementById('menu-list');
        if (!container) return;
        
        const lang = localStorage.getItem('selectedLanguage') || 'en';
        
        container.innerHTML = meals.map(meal => `
            <article class="meal-card" data-meal-id="${meal.id}" draggable="true">
                <h2 class="meal-name">${meal.names[lang] || meal.names['en']}</h2>
            </article>
        `).join('');
    }
}