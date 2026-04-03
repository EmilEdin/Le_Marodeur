/**
 * PaymentController.js
 * Handles payment-related mock interactions for QR and Card forms.
 */
document.addEventListener('DOMContentLoaded', () => {
    const showQrBtn = document.getElementById('btn-show-qr');
    const scanQrBtn = document.getElementById('btn-scan-qr');
    const backBtns = document.querySelectorAll('.payment-back-btn');
    
    const qrOptionsSection = document.getElementById('qr-options');
    const showQrSection = document.getElementById('show-qr-section');
    const scanQrSection = document.getElementById('scan-qr-section');

    function showSection(sectionElement) {
        if (qrOptionsSection) qrOptionsSection.classList.add('hidden');
        if (showQrSection) showQrSection.classList.add('hidden');
        if (scanQrSection) scanQrSection.classList.add('hidden');
        
        if (sectionElement) sectionElement.classList.remove('hidden');
    }

    if (showQrBtn) showQrBtn.addEventListener('click', () => showSection(showQrSection));
    if (scanQrBtn) scanQrBtn.addEventListener('click', () => showSection(scanQrSection));
    
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => showSection(qrOptionsSection));
    });

    const cardForm = document.getElementById('card-payment-form');
    if (cardForm) {
        cardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Payment processing (MVP mock)');
        });
    }
});