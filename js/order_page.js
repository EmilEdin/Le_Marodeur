let draggedMeal = null; // Global so drop zones can see it

// Wrapped in a function so MenuController can re-run it every time the menu is filtered
window.initDragAndDrop = function() {
    const mealCards = document.querySelectorAll('.meal-card');
    mealCards.forEach(card => {
        card.draggable = true;
        
        card.addEventListener('dragstart', (e) => {
            draggedMeal = card;
            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('text/plain', card.dataset.mealId);
            }
            setTimeout(() => card.classList.add('dragging'), 0);
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            draggedMeal = null;
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const cartBar = document.querySelector('.bottom-cart-bar');
    const cartStatus = document.querySelector('.cart-status p');

    if (cartBar) {
        cartBar.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
            cartBar.classList.add('drag-over');
        });

        cartBar.addEventListener('dragleave', () => {
            cartBar.classList.remove('drag-over');
        });

        cartBar.addEventListener('drop', (e) => {
            e.preventDefault();
            cartBar.classList.remove('drag-over');
            
            if (draggedMeal) {
                const mealId = draggedMeal.dataset.mealId;
                // Find the actual meal data from our database
                const menuItem = menuData.find(m => m.id === mealId);
                const lang = localStorage.getItem('selectedLanguage') || 'en';
                
                if (menuItem) {
                    CartModel.addItem({
                        id: menuItem.id,
                        name: menuItem.names[lang] || menuItem.names['en'],
                        price: menuItem.price,
                        quantity: 1
                    });
                    
                    // Visual feedback
                    const mealName = menuItem.names[lang] || menuItem.names['en'];
                    cartStatus.textContent = `Added ${mealName} to cart!`;
                    cartBar.classList.add('item-dropped');
                    cartStatus.style.color = '#e04f26';
                    cartStatus.style.fontWeight = '700';
                    
                    setTimeout(() => {
                        cartBar.classList.remove('item-dropped');
                        cartStatus.style.color = '';
                        cartStatus.style.fontWeight = '500';
                        updateCartUI(); // Reset the text back to total price
                    }, 1500);
                }
            }
        });
    }

// Function to update cart UI
    function updateCartUI() {
        if (!cartStatus) return;
        const total = CartModel.getTotal();
        const count = CartModel.getCount();
        const badge = document.getElementById('cart-badge');
        
        if (count > 0) {
            // CRITICAL FIX: Remove the translation attribute so the LanguageController 
            // doesn't force this text back to "You have not added anything yet"
            cartStatus.removeAttribute('data-i18n');
            
            cartStatus.textContent = `My Order ${total}€`;
            if (badge) {
                badge.textContent = count;
                badge.style.display = 'inline-block';
            }
        } else {
            // If the cart is empty, put the translation attribute back
            cartStatus.setAttribute('data-i18n', 'cart_empty');
            
            // Force the translation immediately based on current language
            const lang = localStorage.getItem('selectedLanguage') || 'en';
            if (typeof dictionary !== 'undefined' && dictionary[lang] && dictionary[lang]['cart_empty']) {
                cartStatus.textContent = dictionary[lang]['cart_empty'];
            } else {
                cartStatus.textContent = 'You have not added anything yet';
            }
            
            if (badge) badge.style.display = 'none';
        }
    }

    // Initialize UI
    if (typeof CartModel !== 'undefined') {
        CartModel.subscribe(updateCartUI);
        updateCartUI();
    }
});
