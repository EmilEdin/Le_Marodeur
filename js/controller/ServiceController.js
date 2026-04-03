/**
 * ServiceController.js
 * Handles the logic for requesting assistance from restaurant staff.
 */
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('callServiceBtn');
    const popup = document.getElementById('servicePopup');

    if (btn && popup) {
        btn.addEventListener('click', () => {
            // Show the popup
            popup.classList.remove('hidden');
            
            btn.disabled = true;
            btn.setAttribute('data-i18n', 'service_called_btn');
            btn.classList.add('disabled-btn');
            
            if (typeof updateUI === 'function') {
                updateUI();
            }
        });
    }
});