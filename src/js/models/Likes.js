export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, img) {
        const item = { id, title, img};
        this.likes.push(item);
        this.persistdata();
        return item;
    }

    removeLike(id) {
        const position = this.likes.findIndex(el => el.id === id);
        this.likes.splice(position, 1);
        this.persistdata();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    totalLikes() {
        return this.likes.length;
    }

    persistdata() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readPersistedData() {
        const data = JSON.parse(localStorage.getItem('likes'));
        if (data) {
            this.likes = data;
        }
    }
}