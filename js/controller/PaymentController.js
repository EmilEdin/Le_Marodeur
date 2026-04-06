/**
 * PaymentController.js
 * Handles payment interactions for QR and Card forms.
 */
document.addEventListener('DOMContentLoaded', () => {
    const showQrBtn = document.getElementById('btn-show-qr');
    const scanQrBtn = document.getElementById('btn-scan-qr');
    const backBtns = document.querySelectorAll('.payment-back-btn');
    
    const qrOptionsSection = document.getElementById('qr-options');
    const showQrSection = document.getElementById('show-qr-section');
    const scanQrSection = document.getElementById('scan-qr-section');

    function t(lang, key, fallback) {
        if (typeof dictionary !== 'undefined' && dictionary[lang] && dictionary[lang][key]) {
            return dictionary[lang][key];
        }
        return fallback;
    }

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
            const lang = localStorage.getItem('selectedLanguage') || 'en';
            alert(t(lang, 'payment_submitted', 'Payment submitted.'));
        });
    }
});