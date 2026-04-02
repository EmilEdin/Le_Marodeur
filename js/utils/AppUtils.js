/**
 * AppUtils.js
 * Shared utility helpers for language, translation, and formatting.
 */
const AppUtils = (() => {
    const ORDER_MODE_STORAGE_KEY = 'le_marodeur_order_mode';
    const localeByLanguage = {
        en: 'en-US',
        sv: 'sv-SE',
        fr: 'fr-FR'
    };

    function getLanguage() {
        return localStorage.getItem('selectedLanguage') || 'en';
    }

    function getLocale() {
        return localeByLanguage[getLanguage()] || localeByLanguage.en;
    }

    function getOrderMode() {
        return localStorage.getItem(ORDER_MODE_STORAGE_KEY) === 'group' ? 'group' : 'single';
    }

    function setOrderMode(mode) {
        localStorage.setItem(ORDER_MODE_STORAGE_KEY, mode === 'group' ? 'group' : 'single');
    }

    function isGroupOrder() {
        return getOrderMode() === 'group';
    }

    function translate(key, fallback = '') {
        if (typeof dictionary === 'undefined') {
            return fallback || key;
        }

        const lang = getLanguage();
        const selectedDictionary = dictionary[lang] || {};
        const defaultDictionary = dictionary.en || {};
        return selectedDictionary[key] || defaultDictionary[key] || fallback || key;
    }

    function interpolate(template, values = {}) {
        return Object.entries(values).reduce((result, [key, value]) => {
            return result.split(`{${key}}`).join(value);
        }, template);
    }

    function formatCurrency(value) {
        const amount = Number(value) || 0;
        const hasDecimals = Math.round(amount * 100) % 100 !== 0;

        return new Intl.NumberFormat(getLocale(), {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: hasDecimals ? 2 : 0,
            maximumFractionDigits: 2
        }).format(amount);
    }

    return {
        getLanguage,
        getLocale,
        getOrderMode,
        setOrderMode,
        isGroupOrder,
        translate,
        interpolate,
        formatCurrency
    };
})();
