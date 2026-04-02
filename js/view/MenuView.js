/**
 * MenuView.js
 * Handles the rendering of the menu items and categories with modern classes.
 */
class MenuView {
    /**
     * Renders the category list elements into the DOM.
     * @param {Array<Object>} categories - The array of categories to render.
     * @param {string} activeCategoryId - The ID of the currently active category.
     */
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
                <button type="button" class="category-btn" ${cat.id === activeCategoryId ? 'aria-current="true"' : ''}>
                    <img src="${imgSrc}" alt="" class="category-img">
                    <span class="category-name" data-i18n="${cat.i18n}">${cat.defaultName}</span>
                </button>
            </li>
            `;
        }).join('');
        
        
        if (typeof updateUI === 'function') updateUI();
    }

    /**
     * Renders the list of meal cards for a specific category into the DOM.
     * @param {Array<Object>} meals - The array of meals to render.
     */
    static renderMeals(meals) {
        const container = document.getElementById('menu-list');
        if (!container) return;
        
        const lang = AppUtils.getLanguage();

        if (meals.length === 0) {
            container.innerHTML = `
                <div class="menu-empty-state">
                    <p>${AppUtils.translate('no_meals_available', 'No meals available right now.')}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = meals.map((meal) => {
            const descriptions = meal.descriptions || {};

            return `
            <article class="meal-card" data-meal-id="${meal.id}" draggable="true" tabindex="0">
                <div class="meal-copy">
                    <h2 class="meal-name">${meal.names[lang] || meal.names.en}</h2>
                    <p class="meal-description-preview">${descriptions[lang] || descriptions.en || ''}</p>
                </div>
                <span class="meal-price">${AppUtils.formatCurrency(meal.price)}</span>
            </article>
        `;
        }).join('');
    }
}
