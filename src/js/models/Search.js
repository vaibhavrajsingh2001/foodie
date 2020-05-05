import Axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
        this.key = '01ef190912c246c4ad3951aea735db98';
    }

    async searchRecipe() {
        try {
            const res = await Axios(`https://api.spoonacular.com/recipes/search?query=${this.query}&number=30&apiKey=${this.key}`);
            this.result = res.data.results;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}