/**
 * order_page.js
 * Contains UI scripts specifically for the ordering page interactions, 
 * including drag-and-drop to cart.
 */
let draggedMeal = null; 


/**
 * Initializes the drag and drop events for meal cards.
 * Needs to be re-run whenever meals are re-rendered.
 */
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
                
                const menuItem = menuData.find(m => m.id === mealId);
                const lang = AppUtils.getLanguage();
                
                if (menuItem) {
                    CartModel.addItem({
                        id: menuItem.id,
                        name: menuItem.names[lang] || menuItem.names.en,
                        price: menuItem.price,
                        quantity: 1,
                        guestNumber: typeof getCurrentGuestNumber === 'function' ? getCurrentGuestNumber() : 0
                    });
                    
                    
                    const mealName = menuItem.names[lang] || menuItem.names.en;
                    cartStatus.textContent = AppUtils.interpolate(
                        AppUtils.translate('added_to_cart', 'Added {meal} to cart!'),
                        { meal: mealName }
                    );
                    cartBar.classList.add('item-dropped');
                    cartStatus.style.color = '#e04f26';
                    cartStatus.style.fontWeight = '700';
                    
                    setTimeout(() => {
                        cartBar.classList.remove('item-dropped');
                        cartStatus.style.color = '';
                        cartStatus.style.fontWeight = '500';
                        updateCartUI();
                    }, 1500);
                }
            }
        });
    }

// Function to update cart UI
    /**
     * Updates the persistent cart summary UI element and badge
     * at the bottom of the order page.
     */
    window.updateCartSummary = function() {
        if (!cartStatus) return;
        const total = CartModel.getTotal();
        const count = CartModel.getCount();
        const badge = document.getElementById('cart-badge');
        
        if (count > 0) {
            cartStatus.removeAttribute('data-i18n');
            
            const orderText = AppUtils.translate('my_order', 'My Order');
            
            cartStatus.textContent = `${orderText} ${AppUtils.formatCurrency(total)}`;
            if (badge) {
                badge.textContent = count;
                badge.style.display = 'inline-block';
            }
        } else {
            // If the cart is empty, put the translation attribute back
            cartStatus.setAttribute('data-i18n', 'cart_empty');
            
            // Force the translation immediately based on current language
            cartStatus.textContent = AppUtils.translate('cart_empty', 'You have not added anything yet');
            
            if (badge) badge.style.display = 'none';
        }
    };

    // Initialize UI
    if (typeof CartModel !== 'undefined') {
        CartModel.subscribe(updateCartSummary);
        updateCartSummary();
    }
});
