import { elems } from './base';

export const createItem = i => {

    const markup = `
    <li class="shopping__item" data-itemid=${i.id}>
        <div class="shopping__count">
            <input type="number" value="${i.amount}" step="${i.amount}" class='shopping__count-value'>
                <p>${i.unit}</p>
        </div>
        <p class="shopping__description">${i.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
    elems.cartArea.insertAdjacentHTML('beforeend', markup);

};

export const removeItem = id => {

    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);

};