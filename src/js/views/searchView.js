import {
    elems
} from './base';

export const receiver = () => elems.inputField.value;
export const putter = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderer);
    renderButtons(page, recipes.length, resPerPage);
};

const renderer = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.id}">
            <figure class="results__fig">
                 <img src="https://spoonacular.com/recipeImages/${recipe.id}-90x90.jpg" alt="Test">
            </figure>
            <div class="results__data">
                 <h4 class="results__name">${recipe.title}</h4>
                 <p class="readyTime">Ready in: ${recipe.readyInMinutes} minutes.</p>
            </div>
        </a>
    </li>
    `;
    elems.outputList.insertAdjacentHTML('beforeend', markup);
};

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (pages > 1) {
        if (page === 1 && pages > 1) {
            button = createButton(page, 'next');
        } else if (page < pages) {
            button = `
                ${createButton(page, 'prev')}
                ${createButton(page, 'next')}
            `;
        } else {
            button = createButton(page, 'prev');
        }
    }

    elems.searchResPages.insertAdjacentHTML('afterbegin', button);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;