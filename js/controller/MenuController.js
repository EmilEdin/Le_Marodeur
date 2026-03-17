/**
 * MenuController.js
 * Bridges interactions from the Menu View to update Models.
 */

const modal = document.getElementById('meal-detail-modal');
const mealCards = document.querySelectorAll('.meal-card');
const closeBtn = document.querySelector('.close-btn');

mealCards.forEach(card => {
    card.addEventListener('click', () => {
        // Här skulle du egentligen hämta data från din "Model" 
        // baserat på card.dataset.mealId
        
        // Uppdate text in dialog before it shows
        document.getElementById('modal-title').innerText = "Brooklyn Tribute";
        document.getElementById('modal-price').innerText = "93:-";
        
        modal.showModal(); 
    });
});

closeBtn.addEventListener('click', () => {
    modal.close();
});

// Close when clicking outside the dialog content
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});