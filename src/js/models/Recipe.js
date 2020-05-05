import Axios from 'axios';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try {
            const res = await Axios(`https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=01ef190912c246c4ad3951aea735db98`);
            this.ingredients = res.data.extendedIngredients;
            this.summary = res.data.summary;
            this.source = res.data.sourceUrl;
            this.image = res.data.image;
            this.title = res.data.title;
            this.time = res.data.readyInMinutes;
            this.servings = res.data.servings;
            // console.log(this);
        } catch (error) {
            alert(error);
        }
    }
}