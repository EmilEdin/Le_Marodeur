/**
 * CartModel.js
 * Manages the user's current order state.
 */
class CartModel {
    static getCart() {
        return JSON.parse(localStorage.getItem('le_marodeur_cart')) || [];
    }

    static saveCart(cart) {
        localStorage.setItem('le_marodeur_cart', JSON.stringify(cart));
        if (this.listeners) {
            this.notifyListeners();
        }
    }

    static addItem(item) {
        const cart = this.getCart();
        cart.push(item);
        this.saveCart(cart);
    }

    static removeItem(index) {
        const cart = this.getCart();
        cart.splice(index, 1);
        this.saveCart(cart);
    }

    static clearCart() {
        this.saveCart([]);
    }

    static getTotal() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    static getCount() {
        return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    }

    static listeners = [];
    
    static subscribe(listener) {
        this.listeners.push(listener);
    }

    static notifyListeners() {
        this.listeners.forEach(listener => listener(this.getCart()));
    }
}