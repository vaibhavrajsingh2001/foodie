export const elems = {
    inputField: document.querySelector('.search__field'),
    inputForm: document.querySelector('.search'),
    outputList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    outputDiv: document.querySelector('.results'),
    recipeArea: document.querySelector('.recipe'),
    cartArea: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
}

export const addLoader = parent => {
    const loader = `
    <div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const removeLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};

export const clearer = el => {
    if (el.nodeName == 'INPUT') {
        el.value = '';
    }
    el.innerHTML = '';
};