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