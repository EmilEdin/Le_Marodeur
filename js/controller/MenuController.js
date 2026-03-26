/**
 * MenuController.js
 * Bridges interactions from the Menu View to update Models.
 */
// Add these variables at the top with your others
const infoIcon = document.querySelector('.info-icon');
const infoModal = document.getElementById('info-modal');
const closeInfoBtn = document.querySelector('.close-info-btn');

// Add the event listener for the Info Icon
infoIcon.addEventListener('click', () => {
    // Optionally close the first modal, or leave it open underneath
    // modal.close(); 
    infoModal.showModal();
});

// Close button for the info modal
closeInfoBtn.addEventListener('click', () => {
    infoModal.close();
});

// Close when clicking outside the info dialog content
infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) infoModal.close();
});

const modal = document.getElementById('meal-detail-modal');
const mealCards = document.querySelectorAll('.meal-card');
const closeBtn = document.querySelector('.close-btn');

let currentMealId = null;

mealCards.forEach(card => {
    card.addEventListener('click', () => {
        const mealId = card.dataset.mealId;
        currentMealId = mealId;
        const meal = menuData.find(m => m.id === mealId) || menuData[0];
        
        const lang = localStorage.getItem('selectedLanguage') || 'en';
        
        document.getElementById('modal-title').innerText = meal.names[lang] || meal.names['en'];
        document.getElementById('modal-price').innerText = `${meal.price}:-`;
        
        const quantitySelect = document.getElementById('meal-quantity');
        if (quantitySelect) quantitySelect.value = "1";
        
        modal.showModal(); 
    });
});

const addToOrderBtn = document.getElementById('add-to-order');
if (addToOrderBtn) {
    addToOrderBtn.addEventListener('click', () => {
        if (!currentMealId || typeof CartModel === 'undefined') {
            modal.close();
            return;
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

closeBtn.addEventListener('click', () => {
    modal.close();
});

// Close when clicking outside the dialog content
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});