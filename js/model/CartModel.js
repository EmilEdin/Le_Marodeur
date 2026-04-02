/**
 * CartModel.js
 * Manages the user's current order state.
 */
const CART_STORAGE_KEY = 'le_marodeur_cart';

class CartModel {
    /**
     * Normalizes a cart item before persistence.
     * @param {Object} item - The raw cart item.
     * @returns {Object|null} The normalized cart item, or null if invalid.
     */
    static normalizeItem(item) {
        if (!item || !item.id) {
            return null;
        }

        const quantity = Number.parseInt(item.quantity, 10);
        const price = Number(item.price);
        const guestNumber = Number.parseInt(item.guestNumber, 10);
        const guestLabelFromLegacyData = item.guestLabel || '';
        const legacyGuestMatch = guestLabelFromLegacyData.match(/(\d+)/);

        return {
            id: item.id,
            name: item.name || '',
            price: Number.isFinite(price) ? price : 0,
            quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
            guestNumber: Number.isFinite(guestNumber) && guestNumber > 0
                ? guestNumber
                : (legacyGuestMatch ? Number.parseInt(legacyGuestMatch[1], 10) : 0)
        };
    }

    /**
     * Retrieves the current cart from local storage.
     * @returns {Array<Object>} The array of cart items.
     */
    static getCart() {
        try {
            const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
            if (!Array.isArray(storedCart)) {
                return [];
            }

            return storedCart
                .map((item) => this.normalizeItem(item))
                .filter(Boolean);
        } catch (error) {
            return [];
        }
    }

    /**
     * Saves the cart array to local storage and notifies all listeners.
     * @param {Array<Object>} cart - The updated cart array to save.
     */
    static saveCart(cart) {
        const normalizedCart = Array.isArray(cart)
            ? cart.map((item) => this.normalizeItem(item)).filter(Boolean)
            : [];

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizedCart));
        this.notifyListeners(normalizedCart);
    }

    /**
     * Adds a new item to the cart.
     * @param {Object} item - The meal item object containing id, name, price, and quantity.
     */
    static addItem(item) {
        const nextItem = this.normalizeItem(item);
        if (!nextItem) {
            return;
        }

        const cart = this.getCart();
        const existingItem = cart.find((cartItem) => {
            return cartItem.id === nextItem.id && cartItem.guestNumber === nextItem.guestNumber;
        });

        if (existingItem) {
            existingItem.quantity += nextItem.quantity;
            existingItem.name = nextItem.name;
            existingItem.price = nextItem.price;
        } else {
            cart.push(nextItem);
        }

        this.saveCart(cart);
    }

    /**
     * Removes an item from the cart at the given index.
     * @param {number} index - The index of the item to remove.
     */
    static removeItem(index) {
        const cart = this.getCart();
        if (index < 0 || index >= cart.length) {
            return;
        }

        cart.splice(index, 1);
        this.saveCart(cart);
    }

    /**
     * Updates the quantity of an item in the cart.
     * @param {number} index - The item index.
     * @param {number} quantity - The new quantity to persist.
     */
    static updateItemQuantity(index, quantity) {
        const cart = this.getCart();
        if (index < 0 || index >= cart.length) {
            return;
        }

        const nextQuantity = Number.parseInt(quantity, 10);
        if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
            return;
        }

        cart[index] = {
            ...cart[index],
            quantity: nextQuantity
        };

        this.saveCart(cart);
    }

    /**
     * Moves an item from one index to another in the cart (Drag and Drop support).
     * @param {number} fromIndex - Original index of the item.
     * @param {number} toIndex - New index of the item.
     */
    static moveItem(fromIndex, toIndex) {
        const cart = this.getCart();
        if (fromIndex >= 0 && fromIndex < cart.length && toIndex >= 0 && toIndex <= cart.length) {
            const [movedItem] = cart.splice(fromIndex, 1);
            cart.splice(toIndex, 0, movedItem);
            this.saveCart(cart);
        }
    }

    /**
     * Clears all items from the cart.
     */
    static clearCart() {
        this.saveCart([]);
    }

    /**
     * Gets the total cost of all items in the cart.
     * @returns {number} The sum of all item totals (price * quantity).
     */
    static getTotal() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    /**
     * Gets the total quantity of items currently in the cart.
     * @returns {number} The sum of all item quantities.
     */
    static getCount() {
        return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * Array of callback functions to call on cart updates.
     * @type {Array<Function>} 
     */
    static listeners = [];
    
    /**
     * Subscribes a listener to cart updates.
     * @param {Function} listener - The callback function to subscribe.
     */
    static subscribe(listener) {
        if (typeof listener === 'function' && !this.listeners.includes(listener)) {
            this.listeners.push(listener);
        }
    }

    /**
     * Notifies all subscribed listeners.
     */
    static notifyListeners(cart = this.getCart()) {
        this.listeners.forEach((listener) => listener(cart));
    }
}
