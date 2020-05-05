import { elems } from './base';

export const toggleLike = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const likeMenu = likesCount => {
    elems.likesMenu.getElementsByClassName.visibility = likesCount > 0 ? 'visible' : 'hidden';
};