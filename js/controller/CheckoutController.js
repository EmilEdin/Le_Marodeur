/**
 * CheckoutController.js
 * Handles tip selection, totals, and payment-method validation.
 */
document.addEventListener('DOMContentLoaded', () => {
    const tableNumberInput = document.getElementById('table-number');
    const subtotalAmount = document.getElementById('subtotal-amount');
    const totalAmount = document.getElementById('total-amount');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const paymentButtons = document.querySelectorAll('[data-payment-target]');
    const emptyState = document.getElementById('checkout-empty-state');

    let currentTip = Number.parseInt(localStorage.getItem('le_marodeur_tip_percentage'), 10) || 0;

    function highlightTipButton() {
        tipButtons.forEach((button) => {
            button.classList.toggle('active', Number(button.dataset.tipPercentage) === currentTip);
        });
    }

    window.updateTotals = function() {
        const subtotal = CartModel.getTotal();
        const tipAmount = subtotal * (currentTip / 100);
        const total = subtotal + tipAmount;

        if (subtotalAmount) {
            subtotalAmount.textContent = AppUtils.formatCurrency(subtotal);
        }

        if (totalAmount) {
            totalAmount.textContent = AppUtils.formatCurrency(total);
        }
    };

    function syncCheckoutState() {
        const hasItems = CartModel.getCount() > 0;

        paymentButtons.forEach((button) => {
            button.disabled = !hasItems;
        });

        if (emptyState) {
            emptyState.classList.toggle('hidden', hasItems);
        }
    }

    function proceedTo(url) {
        if (CartModel.getCount() === 0) {
            alert(AppUtils.translate('checkout_empty_alert', 'Add something to your order before checkout.'));
            return;
        }

        const tableNumber = tableNumberInput ? tableNumberInput.value.trim() : '';
        if (!tableNumber) {
            alert(AppUtils.translate('table_number_required', 'Please enter your table number to proceed.'));
            if (tableNumberInput) {
                tableNumberInput.focus();
            }
            return;
        }

        localStorage.setItem('le_marodeur_table_number', tableNumber);
        localStorage.setItem('le_marodeur_tip_percentage', String(currentTip));
        window.location.href = url;
    }

    if (tableNumberInput) {
        tableNumberInput.value = localStorage.getItem('le_marodeur_table_number') || '';
    }

    tipButtons.forEach((button) => {
        button.addEventListener('click', () => {
            currentTip = Number(button.dataset.tipPercentage) || 0;
            highlightTipButton();
            updateTotals();
        });
    });

    paymentButtons.forEach((button) => {
        button.addEventListener('click', () => {
            proceedTo(button.dataset.paymentTarget);
        });
    });

    highlightTipButton();
    updateTotals();
    syncCheckoutState();
    CartModel.subscribe(() => {
        updateTotals();
        syncCheckoutState();
    });
});
