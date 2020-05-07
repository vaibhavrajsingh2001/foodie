import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from "./views/listView";
import * as likesView from './views/likesView';
import {
    elems,
    addLoader,
    removeLoader,
    clearer
} from './views/base';

const state = {};

//controller for search
const searchFunc = async () => {
    const query = searchView.receiver();

    if (query) {
        addLoader(elems.outputDiv);
        state.searcher = new Search(query);
        [elems.outputList, elems.searchResPages, elems.recipeArea].forEach(el => clearer(el));
        try {
            await state.searcher.searchRecipe();
            removeLoader();
            // console.log(state.searcher.result);
            if (state.searcher.result.length > 0) {
                searchView.putter(state.searcher.result);
            } else {
                alert("Enter valid name to search.")
            }
            clearer(elems.inputField);
        } catch (error) {
            alert(error);
        }
        // console.log(state.searcher.result.id);
        // searchView.putter(state.searcher.result);
        // console.log(state.searcher.result);
    }

};

elems.inputForm.addEventListener('submit', e => {
    e.preventDefault();
    searchFunc();
});

elems.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const pageNum = parseInt(btn.dataset.goto, 10);
        [elems.outputList, elems.searchResPages].forEach(el => clearer(el));
        searchView.putter(state.searcher.result, pageNum);
    }
});

elems.recipeArea.addEventListener('click', e => {
    if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
        showCart();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        showLikes();
    }
});

elems.cartArea.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.cart.deleteItem(id);
        listView.removeItem(id);
    } else if (e.target.matches('.shopping__count-value, .shopping__count-value *')) {
        const amount = parseFloat(e.target.value, 10);
        state.cart.updateAmount(id, amount);
    }
});

//controller for loading recipe
const showRecipe = async () => {
    const id = window.location.hash.substring(1);

    if (id) {
        clearer(elems.recipeArea)
        addLoader(elems.recipeArea);
        state.recipeData = new Recipe(id);
        try {
            await state.recipeData.getRecipe();
            removeLoader();
            recipeView.putter(state.recipeData,state.likes.isLiked(id));
        } catch (error) {
            alert(error);
        }

    }
};

//controller for cart
const showCart = () => {
    if (!state.cart) {
        state.cart = new List();
    }

    state.recipeData.ingredients.forEach(el => {
        const item = state.cart.addItem(el.amount, el.unit, el.name);
        listView.createItem(item);
    })
};

//controller for likes
const showLikes = () => {
    if(!state.likes) {
        state.likes = new Likes();
    }
    const id = state.recipeData.id;

    if(!state.likes.isLiked(id)) {
        const newLike = state.likes.addLike(id, state.recipeData.title, state.recipeData.image);
        likesView.toggleLike(true);
        likesView.likesPutter(newLike);
    } else {
        state.likes.removeLike(id);
        likesView.toggleLike(false);
        likesView.likeClearer(id);
    }
    likesView.likeMenu(state.likes.totalLikes);
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, showRecipe));

// to get liked itmes from localstorage on each refresh
window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readPersistedData();
    likesView.likeMenu(state.likes.totalLikes);
    state.likes.likes.forEach(el => likesView.likesPutter(el));
});