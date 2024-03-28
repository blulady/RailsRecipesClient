import { Category } from "./category";
import { Ingredient } from "./ingredient";
import { Review } from "./review";

export class Recipe {
  id: number;
  name: string;
  description: string;
  servings: string;
  img_url: string;
  instructions: string;
  difficulty_level: string;
  cooking_time: number;
  meal: string;
  ingredients: Ingredient[];
  categories: Category[];
  reviews: Review[];

  constructor(recipe:any) {
    this.id = recipe.id || 0;
    this.name = recipe.name || '';
    this.description = recipe.description || '';
    this.servings = recipe.servings || '';
    this.img_url = recipe.img_url || '';
    this.instructions = recipe.instructions || '';
    this.difficulty_level = recipe.difficulty_level || '';
    this.cooking_time = recipe.cooking_time || 0;
    this.meal = recipe.meal || '';
    this.ingredients = recipe.ingredients || [];
    this.categories = recipe.categories || [];
    this.reviews = recipe.reviews || [];
  }
}
