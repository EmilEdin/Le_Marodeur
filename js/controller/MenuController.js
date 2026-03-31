/**
 * MenuController.js
 * Bridges interactions from the Menu View to update Models.
 */
// Info Modal logic
const infoIcon = document.querySelector('.info-icon');
const infoModal = document.getElementById('info-modal');
const closeInfoBtn = document.querySelector('.close-info-btn');

if (infoIcon) infoIcon.addEventListener('click', () => infoModal.showModal());
if (closeInfoBtn) closeInfoBtn.addEventListener('click', () => infoModal.close());
if (infoModal) infoModal.addEventListener('click', (e) => { if (e.target === infoModal) infoModal.close(); });

// Meal Modal Logic
const modal = document.getElementById('meal-detail-modal');
const closeBtn = document.querySelector('.close-btn');
let currentMealId = null;
let currentCategory = 'todays_special'; // Default category on load

// EVENT DELEGATION: Listen to clicks on the container, so it works on newly generated cards
const menuListContainer = document.getElementById('menu-list');
if (menuListContainer) {
    menuListContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.meal-card');
        if (!card) return;
        
        currentMealId = card.dataset.mealId;
        const meal = menuData.find(m => m.id === currentMealId) || menuData[0];
        const lang = localStorage.getItem('selectedLanguage') || 'en';
        
        document.getElementById('modal-title').innerText = meal.names[lang] || meal.names['en'];
        document.getElementById('modal-price').innerText = `${meal.price}:-`;
        
        const quantitySelect = document.getElementById('meal-quantity');
        if (quantitySelect) quantitySelect.value = "1";
        
        modal.showModal(); 
    });
}

// Add to Cart Logic
const addToOrderBtn = document.getElementById('add-to-order');
if (addToOrderBtn) {
    addToOrderBtn.addEventListener('click', () => {
        if (!currentMealId || typeof CartModel === 'undefined') {
            modal.close(); return;
        }
        
        const meal = menuData.find(m => m.id === currentMealId);
        if (meal) {
            const lang = localStorage.getItem('selectedLanguage') || 'en';
            const quantitySelect = document.getElementById('meal-quantity');
            const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
            
            CartModel.addItem({
                id: meal.id,
                name: meal.names[lang] || meal.names['en'],
                price: meal.price,
                quantity: quantity
            });
        }
        modal.close();
    });
}

if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });

// DYNAMIC CATEGORY CLICKING LOGIC
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

// Global function to update the view based on the current category
window.updateMealsDisplay = function() {
    const filteredMeals = menuData.filter(m => m.categoryId === currentCategory);
    MenuView.renderMeals(filteredMeals);
    
    // Re-attach drag and drop listeners to the newly created HTML cards
    if (typeof initDragAndDrop === 'function') {
        initDragAndDrop();
    }
};

// Initialize App on Load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('category-list')) {
        MenuView.renderCategories(categoriesData, currentCategory);
        updateMealsDisplay();
    }
});