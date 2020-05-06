import { elems } from './base';

export const toggleLike = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const likeMenu = likesCount => {
    elems.likesMenu.getElementsByClassName.visibility = likesCount > 0 ? 'visible' : 'hidden';
};

export const likesPutter = item => {
    const markup =`
     <li>
        <a class="likes__link" href="#${item.id}">
            <figure class="likes__fig">
                <img src="${item.img}" alt="${item.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${item.title}</h4>
            </div>
        </a>
    </li>
    `;
    elems.likesList.insertAdjacentHTML('beforeend', markup);
};

export const likeClearer = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);

}