/**
 * OrderController.js
 * Renders the order list in order.html and manages deleting items.
 * Handles order confirmation Modals and badge updates.
 */
document.addEventListener('DOMContentLoaded', () => {
    const orderContainer = document.getElementById('order-container');
    const orderTotalText = document.getElementById('order-total-text');
    const badge = document.getElementById('cart-badge');
    const deleteModal = document.getElementById('delete-confirm-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    
    let itemToDeleteIndex = null;
    let draggedItemIndex = null;

    if (confirmDeleteBtn && cancelDeleteBtn && deleteModal) {
        confirmDeleteBtn.onclick = () => {
            if (itemToDeleteIndex !== null) {
                CartModel.removeItem(itemToDeleteIndex);
                itemToDeleteIndex = null;
            }
            deleteModal.close();
        };
        
        cancelDeleteBtn.onclick = () => {
            itemToDeleteIndex = null;
            deleteModal.close();
        };

        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) {
                itemToDeleteIndex = null;
                deleteModal.close();
            }
        });
    }

    
    /**
     * Renders the current order into the order container.
     * Maps the cart items to their corresponding translations and creates DOM elements.
     */
    window.renderOrder = function() {
        const cart = CartModel.getCart();
        orderContainer.innerHTML = '';
        const lang = localStorage.getItem('selectedLanguage') || 'en';

        if (cart.length === 0) {
            orderContainer.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:30px;"><p class="cart-empty-text" data-i18n="cart_empty">Your order is empty.</p></td></tr>';            
            
            if (typeof updateUI === 'function') {
                updateUI();
            }
        } else {
            cart.forEach((item, index) => {
                const row = document.createElement('tr');
                row.className = 'order-item-row';
                row.draggable = true;
                
                // Add drag and drop functionality
                row.addEventListener('dragstart', (e) => {
                    draggedItemIndex = index;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', index);
                    setTimeout(() => row.classList.add('dragging'), 0);
                });
                
                row.addEventListener('dragend', () => {
                    draggedItemIndex = null;
                    row.classList.remove('dragging');
                    document.querySelectorAll('.order-item-row').forEach(r => {
                        r.classList.remove('drag-over-top', 'drag-over-bottom');
                    });
                });
                
                row.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    if (draggedItemIndex === null || draggedItemIndex === index) return;
                    
                    const bounding = row.getBoundingClientRect();
                    const offset = bounding.y + (bounding.height / 2);
                    
                    row.classList.remove('drag-over-top', 'drag-over-bottom');
                    if (e.clientY - offset > 0) {
                        row.classList.add('drag-over-bottom');
                    } else {
                        row.classList.add('drag-over-top');
                    }
                });
                
                row.addEventListener('dragleave', () => {
                    row.classList.remove('drag-over-top', 'drag-over-bottom');
                });
                
                row.addEventListener('drop', (e) => {
                    e.preventDefault();
                    row.classList.remove('drag-over-top', 'drag-over-bottom');
                    
                    if (draggedItemIndex !== null && draggedItemIndex !== index) {
                        const bounding = row.getBoundingClientRect();
                        const offset = bounding.y + (bounding.height / 2);
                        
                        let targetIndex = index;
                        // If dropping on the bottom half, place it after
                        if (e.clientY - offset > 0) {
                            targetIndex = index + 1;
                        }
                        
                        // Adjust target index if moving downwards
                        if (draggedItemIndex < targetIndex) {
                            targetIndex--;
                        }
                        
                        if (draggedItemIndex !== targetIndex) {
                            CartModel.moveItem(draggedItemIndex, targetIndex);
                        }
                    }
                });
                
                let displayName = item.name;
                if (typeof menuData !== 'undefined') {
                    const meal = menuData.find(m => m.id === item.id);
                    if (meal && meal.names[lang]) {
                        displayName = meal.names[lang];
                    }
                }

                const nameTd = document.createElement('td');
                nameTd.textContent = displayName;

                const priceTd = document.createElement('td');
                priceTd.textContent = `${item.price}:-`;

                const qtyTd = document.createElement('td');
                qtyTd.textContent = item.quantity;

                const totalTd = document.createElement('td');
                totalTd.textContent = `${item.price * item.quantity}:-`;

                const actionTd = document.createElement('td');
                actionTd.className = 'action-cell';
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn-table';
                deleteBtn.innerHTML = '✕';
                deleteBtn.setAttribute('aria-label', 'Remove item');
                deleteBtn.onclick = () => {
                    itemToDeleteIndex = index;
                    if (deleteModal) {
                        deleteModal.showModal();
                    } else {
                        CartModel.removeItem(index);
                    }
                };
                
                actionTd.appendChild(deleteBtn);
                
                row.appendChild(nameTd);
                row.appendChild(priceTd);
                row.appendChild(qtyTd);
                row.appendChild(totalTd);
                row.appendChild(actionTd);
                
                orderContainer.appendChild(row);
            });
        }
        
        updateFooter();
    }

    /**
     * Updates the footer view including the order total and the cart badge count.
     */
    window.updateFooter = function() {
        const total = CartModel.getTotal();
        const count = CartModel.getCount();
        const lang = localStorage.getItem('selectedLanguage') || 'en';
        
        
        const toPaymentText = { en: 'To Payment', sv: 'Till Betalning', fr: 'Vers le Paiement' };
        const prefix = toPaymentText[lang] || toPaymentText['en'];
        
        if (count > 0) {
            orderTotalText.textContent = `${prefix} ${total}€`;
            if (badge) {
                badge.textContent = count;
                badge.style.display = 'inline-block';
            }
        } else {
            orderTotalText.textContent = `${prefix} 0€`;
            if (badge) badge.style.display = 'none';
        }
    }

    CartModel.subscribe(renderOrder);
    renderOrder();
});