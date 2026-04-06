/**
 * CheckoutController.js
 * Handles tip selection, total cost calculation, and payment method navigation.
 */
document.addEventListener('DOMContentLoaded', () => {
    let currentTip = 0;

    const subtotalAmountEl = document.getElementById('subtotal-amount');
    const totalAmountEl = document.getElementById('total-amount');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const tableNumberInput = document.getElementById('table-number');

    function t(lang, key, fallback) {
        if (typeof dictionary !== 'undefined' && dictionary[lang] && dictionary[lang][key]) {
            return dictionary[lang][key];
        }
        return fallback;
    }

    function updateTotals() {
        if (typeof CartModel === 'undefined') return;
        
        const subtotal = CartModel.getTotal();
        const tipAmount = subtotal * (currentTip / 100);
        const total = subtotal + tipAmount;
        
        if (subtotalAmountEl) subtotalAmountEl.innerText = subtotal.toFixed(2);
        if (totalAmountEl) totalAmountEl.innerText = total.toFixed(2);
    }

    tipButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const percentageStr = e.target.innerText.replace('%', '');
            currentTip = parseInt(percentageStr) || 0;
            
            tipButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            updateTotals();
        });
    });

    const payQrBtn = document.getElementById('btn-pay-qr');
    const payCardBtn = document.getElementById('btn-pay-card');
    const payTableBtn = document.getElementById('btn-pay-table');

    function proceedTo(url) {
        const tableNum = tableNumberInput ? tableNumberInput.value : '';
        const lang = localStorage.getItem('selectedLanguage') || 'en';
        if(!tableNum) {
            alert(t(lang, 'please_enter_table_number', 'Please enter your table number to proceed.'));
            return;
        }
        localStorage.setItem('le_marodeur_table_number', tableNum);
        window.location.href = url;
    }

    if (payQrBtn) payQrBtn.addEventListener('click', () => proceedTo('payment-qr.html'));
    if (payCardBtn) payCardBtn.addEventListener('click', () => proceedTo('payment-card.html'));
    if (payTableBtn) payTableBtn.addEventListener('click', () => proceedTo('payment-waiter.html'));

    updateTotals();
});