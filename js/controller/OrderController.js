/**
 * OrderController.js
 * Renders the order list in order.html and manages deleting items.
 */
document.addEventListener('DOMContentLoaded', () => {
    const orderContainer = document.getElementById('order-container');
    const orderTotalText = document.getElementById('order-total-text');
    const badge = document.getElementById('cart-badge');

    function renderOrder() {
        const cart = CartModel.getCart();
        orderContainer.innerHTML = '';

        if (cart.length === 0) {
            orderContainer.innerHTML = '<p style="text-align: center; color: #666;" data-i18n="cart_empty">Your order is empty.</p>';
            
            // Re-apply translation if language controller is loaded
            if (typeof updateContent === 'function') {
                updateContent();
            }
        } else {
            cart.forEach((item, index) => {
                const row = document.createElement('article');
                row.className = 'order-item';
                
                const leftDiv = document.createElement('div');
                leftDiv.className = 'order-item-left';
                
                const nameSpan = document.createElement('span');
                nameSpan.textContent = item.name + (item.quantity > 1 ? ` x${item.quantity}` : '');
                
                const priceSpan = document.createElement('span');
                priceSpan.textContent = `${item.price * item.quantity}:-`;
                
                leftDiv.appendChild(nameSpan);
                leftDiv.appendChild(priceSpan);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '✕';
                deleteBtn.setAttribute('aria-label', 'Remove item');
                deleteBtn.onclick = () => {
                    CartModel.removeItem(index);
                };
                
                row.appendChild(leftDiv);
                row.appendChild(deleteBtn);
                orderContainer.appendChild(row);
            });
        }
        
        updateFooter();
    }

    function updateFooter() {
        const total = CartModel.getTotal();
        const count = CartModel.getCount();
        
        if (count > 0) {
            orderTotalText.textContent = `To Payment ${total}€`;
            if (badge) {
                badge.textContent = count;
                badge.style.display = 'inline-block';
            }
        } else {
            orderTotalText.textContent = 'To Payment 0€';
            if (badge) badge.style.display = 'none';
        }
    }

    // Initialize and listen to changes
    CartModel.subscribe(renderOrder);
    renderOrder();
});
