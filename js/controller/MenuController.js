/**
 * MenuController.js
 * Bridges interactions from the Menu View to update Models.
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

let currentMealId = null;
let currentCategory = 'todays_special';

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

        
        const descElement = document.querySelector('.meal-description');
        if (descElement && meal.descriptions) {
            
            descElement.removeAttribute('data-i18n'); 
            descElement.innerText = meal.descriptions[lang] || meal.descriptions['en'];
        }

        // 3. Update the Dietary Info Tags dynamically
        const tagsContainer = document.querySelector('.dietary-tags');
        if (tagsContainer && meal.dietary) {
            tagsContainer.innerHTML = '';
            
            if (meal.dietary.length === 0) {
                tagsContainer.innerHTML = '<span style="color:#555; font-size:14px;">No specific dietary warnings.</span>';
            } else {
                meal.dietary.forEach(tag => {
                    let tagClass = 'tag';
                    let tagKey = '';
                    
                    if (tag === 'vegan') { tagClass += ' tag-vegan'; tagKey = 'tag_vegan'; }
                    else if (tag === 'vegetarian') { tagClass += ' tag-veg'; tagKey = 'tag_vegetarian'; }
                    else if (tag === 'gluten_free') { tagClass += ' tag-gf'; tagKey = 'tag_gluten_free'; }
                    else if (tag === 'dairy') { tagClass += ' tag-allergen'; tagKey = 'tag_dairy'; }
                    else if (tag === 'onion') { tagClass += ' tag-allergen'; tagKey = 'tag_onion'; }
                    else if (tag === 'non-alcoholic') { tagClass += ' tag-non-alcoholic'; tagKey = 'tag_non_alcoholic'; }
                    
                    const span = document.createElement('span');
                    span.className = tagClass;
                    span.setAttribute('data-i18n', tagKey);
                    
                    span.innerText = (typeof dictionary !== 'undefined' && dictionary[lang] && dictionary[lang][tagKey]) 
                        ? dictionary[lang][tagKey] 
                        : tag;
                        
                    tagsContainer.appendChild(span);
                });
            }
        }
        
        modal.showModal(); 
    });
}


const quantitySelect = document.getElementById('meal-quantity');
if (quantitySelect) {
    quantitySelect.addEventListener('change', (e) => {
        if (!currentMealId) return;
        
        const meal = menuData.find(m => m.id === currentMealId);
        if (meal) {
            const quantity = parseInt(e.target.value);
            
            document.getElementById('modal-price').innerText = `${meal.price * quantity}:-`;
        }
    });
}


const addToOrderBtn = document.getElementById('add-to-order');
if (addToOrderBtn) {
    addToOrderBtn.addEventListener('click', () => {
        if (!currentMealId || typeof CartModel === 'undefined') {
            modal.close(); return;
        }
        
        const meal = menuData.find(m => m.id === currentMealId);
        if (meal) {
            const lang = localStorage.getItem('selectedLanguage') || 'en';
            
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


window.updateMealsDisplay = function() {
    const filteredMeals = menuData.filter(m => m.categoryId === currentCategory);
    MenuView.renderMeals(filteredMeals);
    
    
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