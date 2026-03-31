document.addEventListener('DOMContentLoaded', () => {
    const mealCards = document.querySelectorAll('.meal-card');
    const cartBar = document.querySelector('.bottom-cart-bar');
    const cartStatus = document.querySelector('.cart-status p');
    
    let draggedMeal = null;

    // Make all meal cards draggable and add event listeners
    mealCards.forEach(card => {
        card.draggable = true;
        
        card.addEventListener('dragstart', (e) => {
            draggedMeal = card;
            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('text/plain', card.querySelector('.meal-name').textContent);
            }
            setTimeout(() => card.classList.add('dragging'), 0);
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            draggedMeal = null;
        });
    });

    // Cart drop zone event listeners
    cartBar.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necessary to allow dropping
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'copy';
        }
        cartBar.classList.add('drag-over');
    });

    cartBar.addEventListener('dragleave', () => {
        cartBar.classList.remove('drag-over');
    });

    cartBar.addEventListener('drop', (e) => {
        e.preventDefault();
        cartBar.classList.remove('drag-over');
        
        if (draggedMeal) {
            const mealName = draggedMeal.querySelector('.meal-name').textContent;
            
            // TODO: Take away styling in a JS file, move to CSS
            // Update the cart text
            cartStatus.textContent = `Added ${mealName} to cart!`;
            cartStatus.style.color = '#e04f26';
            cartStatus.style.fontWeight = '700';
            
            // Visual feedback
            cartBar.classList.add('item-dropped');
            setTimeout(() => {
                cartBar.classList.remove('item-dropped');
                cartStatus.style.color = '';
                cartStatus.style.fontWeight = '500';
            }, 1500);
        }
    });
});
