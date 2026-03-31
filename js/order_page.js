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
                e.dataTransfer.setData('text/plain', card.dataset.mealId);
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

    // Function to update cart UI
    function updateCartUI() {
        if (!cartStatus) return;
        const total = CartModel.getTotal();
        const count = CartModel.getCount();
        const badge = document.getElementById('cart-badge');
        
        if (count > 0) {
            cartStatus.textContent = `My Order ${total}€`;
            if (badge) {
                badge.textContent = count;
                badge.style.display = 'inline-block';
            }
        } else {
            cartStatus.textContent = cartStatus.getAttribute('data-i18n') ? 
                (cartStatus.getAttribute('data-i18n') === 'cart_empty' ? 'You have not added anything yet' : 'My Order 0€') 
                : 'You have not added anything yet';
            if (badge) badge.style.display = 'none';
        }
    }

    // Initialize UI
    if (typeof CartModel !== 'undefined') {
        CartModel.subscribe(updateCartUI);
        updateCartUI();
    }

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
            
            if (menuItem) {
                CartModel.addItem({
                    id: menuItem.id,
                    name: menuItem.names[lang] || menuItem.names['en'],
                    price: menuItem.price,
                    quantity: 1
                });
                
                // Visual feedback
                cartBar.classList.add('item-dropped');
                cartStatus.style.color = '#e04f26';
                cartStatus.style.fontWeight = '700';
                
                setTimeout(() => {
                    cartBar.classList.remove('item-dropped');
                    cartStatus.style.color = '';
                    cartStatus.style.fontWeight = '500';
                }, 1500);
            }
        }
    });
});
