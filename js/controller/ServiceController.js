/**
 * ServiceController.js
 * Handles the call-service button state for the current session.
 */
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('callServiceBtn');
    const popup = document.getElementById('servicePopup');
    const serviceStorageKey = 'le_marodeur_service_called';

    if (!button || !popup) {
        return;
    }

    function renderServiceState() {
        const serviceAlreadyCalled = sessionStorage.getItem(serviceStorageKey) === 'true';

        popup.classList.toggle('hidden', !serviceAlreadyCalled);
        button.disabled = serviceAlreadyCalled;
        button.classList.toggle('disabled-btn', serviceAlreadyCalled);
        button.setAttribute('data-i18n', serviceAlreadyCalled ? 'service_called_btn' : 'call_service');

        if (typeof updateUI === 'function') {
            updateUI();
        }
    }

    button.addEventListener('click', () => {
        sessionStorage.setItem(serviceStorageKey, 'true');
        renderServiceState();
    });

    renderServiceState();
});
