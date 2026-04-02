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
        if (!orderContainer) {
            return;
        }

        const cart = CartModel.getCart();
        orderContainer.innerHTML = '';
        const lang = AppUtils.getLanguage();

        if (cart.length === 0) {
            orderContainer.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px;"><p class="cart-empty-text" data-i18n="cart_empty">${AppUtils.translate('cart_empty', 'You have not added anything yet')}</p></td></tr>`;

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
                const nameWrapper = document.createElement('div');
                nameWrapper.className = 'order-item-name';
                nameWrapper.textContent = displayName;
                nameTd.appendChild(nameWrapper);

                if (item.guestNumber) {
                    const guestMeta = document.createElement('div');
                    guestMeta.className = 'order-item-meta';
                    guestMeta.textContent = AppUtils.interpolate(
                        AppUtils.translate('guest_number', 'Guest {number}'),
                        { number: item.guestNumber }
                    );
                    nameTd.appendChild(guestMeta);
                }

                const priceTd = document.createElement('td');
                priceTd.textContent = AppUtils.formatCurrency(item.price);

                const qtyTd = document.createElement('td');
                const quantitySelect = document.createElement('select');
                quantitySelect.className = 'cart-qty-select';

                const maxSelectableQuantity = Math.max(item.quantity, 10);
                for (let value = 1; value <= maxSelectableQuantity; value++) {
                    const option = document.createElement('option');
                    option.value = value;
                    option.textContent = value;
                    option.selected = value === item.quantity;
                    quantitySelect.appendChild(option);
                }

                quantitySelect.addEventListener('change', (event) => {
                    CartModel.updateItemQuantity(index, Number(event.target.value));
                });

                qtyTd.appendChild(quantitySelect);

                const totalTd = document.createElement('td');
                totalTd.textContent = AppUtils.formatCurrency(item.price * item.quantity);

                const actionTd = document.createElement('td');
                actionTd.className = 'action-cell';

                const actionsWrapper = document.createElement('div');
                actionsWrapper.className = 'item-actions';

                const moveUpBtn = document.createElement('button');
                moveUpBtn.className = 'order-action-btn';
                moveUpBtn.type = 'button';
                moveUpBtn.textContent = '↑';
                moveUpBtn.disabled = index === 0;
                moveUpBtn.setAttribute('aria-label', AppUtils.translate('move_item_up', 'Move item up'));
                moveUpBtn.onclick = () => {
                    if (index > 0) {
                        CartModel.moveItem(index, index - 1);
                    }
                };

                const moveDownBtn = document.createElement('button');
                moveDownBtn.className = 'order-action-btn';
                moveDownBtn.type = 'button';
                moveDownBtn.textContent = '↓';
                moveDownBtn.disabled = index === cart.length - 1;
                moveDownBtn.setAttribute('aria-label', AppUtils.translate('move_item_down', 'Move item down'));
                moveDownBtn.onclick = () => {
                    if (index < cart.length - 1) {
                        CartModel.moveItem(index, index + 1);
                    }
                };

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'order-action-btn delete-btn-table';
                deleteBtn.type = 'button';
                deleteBtn.innerHTML = '✕';
                deleteBtn.setAttribute('aria-label', AppUtils.translate('remove_item', 'Remove item'));
                deleteBtn.onclick = () => {
                    itemToDeleteIndex = index;
                    if (deleteModal) {
                        deleteModal.showModal();
                    } else {
                        CartModel.removeItem(index);
                    }
                };
                actionsWrapper.appendChild(moveUpBtn);
                actionsWrapper.appendChild(moveDownBtn);
                actionsWrapper.appendChild(deleteBtn);
                actionTd.appendChild(actionsWrapper);
                
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
        if (!orderTotalText) {
            return;
        }

        const total = CartModel.getTotal();
        const count = CartModel.getCount();
        const prefix = AppUtils.translate('to_payment', 'To Payment');
        
        if (count > 0) {
            orderTotalText.textContent = `${prefix} ${AppUtils.formatCurrency(total)}`;
            if (badge) {
                badge.textContent = count;
                badge.style.display = 'inline-block';
            }
        } else {
            orderTotalText.textContent = `${prefix} ${AppUtils.formatCurrency(0)}`;
            if (badge) badge.style.display = 'none';
        }
    }

    CartModel.subscribe(renderOrder);
    renderOrder();
});
