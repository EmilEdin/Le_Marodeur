/**
 * CartModel.js
 * Manages the user's current order state.
 */
class CartModel {
    /**
     * Retrieves the current cart from local storage.
     * @returns {Array<Object>} The array of cart items.
     */
    static getCart() {
        return JSON.parse(localStorage.getItem('le_marodeur_cart')) || [];
    }

    /**
     * Saves the cart array to local storage and notifies all listeners.
     * @param {Array<Object>} cart - The updated cart array to save.
     */
    static saveCart(cart) {
        localStorage.setItem('le_marodeur_cart', JSON.stringify(cart));
        if (this.listeners) {
            this.notifyListeners();
        }
    }

    /**
     * Adds a new item to the cart.
     * @param {Object} item - The meal item object containing id, name, price, and quantity.
     */
    static addItem(item) {
        const cart = this.getCart();
        cart.push(item);
        this.saveCart(cart);
    }

    /**
     * Removes an item from the cart at the given index.
     * @param {number} index - The index of the item to remove.
     */
    static removeItem(index) {
        const cart = this.getCart();
        cart.splice(index, 1);
        this.saveCart(cart);
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
        this.listeners.push(listener);
    }

    /**
     * Notifies all subscribed listeners.
     */
    static notifyListeners() {
        this.listeners.forEach(listener => listener(this.getCart()));
    }
}