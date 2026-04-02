/**
 * MenuController.js
 * Bridges interactions from the Menu View to update Models.
 * Handles category selection, meal modal logic, and adding to cart.
 */

const infoIcon = document.querySelector('.info-icon');
const infoModal = document.getElementById('info-modal');
const closeInfoBtn = document.querySelector('.close-info-btn');

if (infoIcon) infoIcon.addEventListener('click', () => infoModal.showModal());
if (closeInfoBtn) closeInfoBtn.addEventListener('click', () => infoModal.close());
if (infoModal) infoModal.addEventListener('click', (e) => { if (e.target === infoModal) infoModal.close(); });

// Meal Modal Logic
const modal = document.getElementById('meal-detail-modal');


const closeBtn = document.getElementById('close-meal-btn');
const orderModeButtons = document.querySelectorAll('.order-mode-btn');
const guestSelectionControls = document.getElementById('guest-selection-controls');
const activeGuestSelect = document.getElementById('active-guest-select');

let currentMealId = null;
let currentCategory = (Array.isArray(categoriesData) && categoriesData.length > 0)
    ? categoriesData[0].id
    : 'todays_special';

const dietaryTagConfig = {
    vegan: { className: 'tag tag-vegan', key: 'tag_vegan' },
    vegetarian: { className: 'tag tag-veg', key: 'tag_vegetarian' },
    gluten_free: { className: 'tag tag-gf', key: 'tag_gluten_free' },
    dairy: { className: 'tag tag-allergen', key: 'tag_dairy' },
    onion: { className: 'tag tag-allergen', key: 'tag_onion' },
    'non-alcoholic': { className: 'tag tag-non-alcoholic', key: 'tag_non_alcoholic' }
};

function getMealById(mealId) {
    return menuData.find((meal) => meal.id === mealId) || null;
}

function getSelectedQuantity() {
    const quantityField = document.getElementById('meal-quantity');
    return quantityField ? Number.parseInt(quantityField.value, 10) || 1 : 1;
}

function getCurrentGuestNumber() {
    if (!AppUtils.isGroupOrder() || !activeGuestSelect) {
        return 0;
    }

    return Number.parseInt(activeGuestSelect.value, 10) || 0;
}

function renderGuestOptions() {
    if (!activeGuestSelect) {
        return;
    }

    const previousValue = activeGuestSelect.value;
    activeGuestSelect.innerHTML = '';

    for (let guestNumber = 1; guestNumber <= 6; guestNumber++) {
        const option = document.createElement('option');
        option.value = guestNumber;
        option.textContent = AppUtils.interpolate(
            AppUtils.translate('guest_number', 'Guest {number}'),
            { number: guestNumber }
        );
        activeGuestSelect.appendChild(option);
    }

    activeGuestSelect.value = previousValue || String(activeGuestSelect.options[0].value);
}

window.renderGroupOrderControls = function() {
    renderGuestOptions();

    orderModeButtons.forEach((button) => {
        const isActive = button.dataset.orderMode === AppUtils.getOrderMode();
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (guestSelectionControls) {
        guestSelectionControls.classList.toggle('hidden', !AppUtils.isGroupOrder());
    }
};

window.getCurrentGuestNumber = getCurrentGuestNumber;

function renderDietaryTags(meal) {
    const tagsContainer = document.querySelector('.dietary-tags');
    if (!tagsContainer) {
        return;
    }

    tagsContainer.innerHTML = '';

    if (!Array.isArray(meal.dietary) || meal.dietary.length === 0) {
        tagsContainer.innerHTML = `<p class="dietary-empty">${AppUtils.translate('no_dietary_warnings', 'No specific dietary warnings.')}</p>`;
        return;
    }

    meal.dietary.forEach((tag) => {
        const config = dietaryTagConfig[tag];
        if (!config) {
            return;
        }

        const span = document.createElement('span');
        span.className = config.className;
        span.textContent = AppUtils.translate(config.key, tag);
        tagsContainer.appendChild(span);
    });
}

function renderMealModal(meal) {
    if (!meal || !modal) {
        return;
    }

    const lang = AppUtils.getLanguage();
    const title = document.getElementById('modal-title');
    const price = document.getElementById('modal-price');
    const description = document.querySelector('.meal-description');

    currentMealId = meal.id;

    if (title) {
        title.textContent = meal.names[lang] || meal.names.en;
    }

    if (price) {
        price.textContent = AppUtils.formatCurrency(meal.price * getSelectedQuantity());
    }

    if (description) {
        const descriptions = meal.descriptions || {};
        description.textContent = descriptions[lang] || descriptions.en || '';
    }

    renderDietaryTags(meal);
}

function openMealModal(mealId) {
    const meal = getMealById(mealId) || menuData[0];
    if (!meal || !modal) {
        return;
    }

    const quantityField = document.getElementById('meal-quantity');
    if (quantityField) {
        quantityField.value = '1';
    }

    renderMealModal(meal);
    modal.showModal();
}

const menuListContainer = document.getElementById('menu-list');
if (menuListContainer) {
    menuListContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.meal-card');
        if (!card) return;
        openMealModal(card.dataset.mealId);
    });

    menuListContainer.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        const card = e.target.closest('.meal-card');
        if (!card) {
            return;
        }

        e.preventDefault();
        openMealModal(card.dataset.mealId);
    });
}


const quantitySelect = document.getElementById('meal-quantity');
if (quantitySelect) {
    quantitySelect.addEventListener('change', (e) => {
        if (!currentMealId) return;
        
        const meal = getMealById(currentMealId);
        if (meal) {
            const quantity = parseInt(e.target.value, 10) || 1;
            document.getElementById('modal-price').textContent = AppUtils.formatCurrency(meal.price * quantity);
        }
    });
}


const addToOrderBtn = document.getElementById('add-to-order');
if (addToOrderBtn) {
    addToOrderBtn.addEventListener('click', () => {
        if (!currentMealId || typeof CartModel === 'undefined') {
            modal.close(); return;
        }
        
        const meal = getMealById(currentMealId);
        if (meal) {
            const lang = AppUtils.getLanguage();
            const quantity = getSelectedQuantity();
            
            CartModel.addItem({
                id: meal.id,
                name: meal.names[lang] || meal.names.en,
                price: meal.price,
                quantity,
                guestNumber: getCurrentGuestNumber()
            });
        }
        modal.close();
    });
}


if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });


const categoryContainer = document.getElementById('category-list');
if (categoryContainer) {
    categoryContainer.addEventListener('click', (e) => {
        const item = e.target.closest('.category-item');
        if (!item) return;
        
        currentCategory = item.dataset.categoryId;
        MenuView.renderCategories(categoriesData, currentCategory);
        updateMealsDisplay();
    });
}

orderModeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        AppUtils.setOrderMode(button.dataset.orderMode);
        renderGroupOrderControls();
    });
});


/**
 * Updates the displayed list of meals based on the currently selected category.
 * Invokes the renderMeals method on the MenuView.
 */
window.updateMealsDisplay = function() {
    const filteredMeals = menuData.filter(m => m.categoryId === currentCategory);
    MenuView.renderMeals(filteredMeals);
    
    
    if (typeof initDragAndDrop === 'function') {
        initDragAndDrop();
    }
};

window.refreshActiveMealModal = function() {
    if (!modal || !modal.open || !currentMealId) {
        return;
    }

    const activeMeal = getMealById(currentMealId);
    renderMealModal(activeMeal);
};

// Initialize App on Load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('category-list')) {
        renderGroupOrderControls();
        MenuView.renderCategories(categoriesData, currentCategory);
        updateMealsDisplay();
    }
});
