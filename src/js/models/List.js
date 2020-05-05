import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.cart = [];
    };

    addItem(amount, unit, ingredient) {
        const i = {
            id: uniqid(),
            amount,
            unit,
            ingredient
        };
        this.cart.push(i);
        return i;
    };

    deleteItem(id) {
        const position = this.cart.findIndex(el => el.id === id);
        this.cart.splice(position,1);
    };

    updateAmount(id, newAmount) {
        this.cart.find(el => el.id === id).amount = newAmount;
    };
}