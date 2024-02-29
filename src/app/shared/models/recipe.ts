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

  constructor(recipe:any) {
    this.id = recipe.id || 0;
    this.name = recipe.name || '';
    this.description = recipe.description || '';
    this.servings = recipe.servings || '';
    this.img_url = recipe.img_url || '';
    this.instructions = recipe.instructions || '';
    this.difficulty_level = recipe.difficulty_level || '';
    this.cooking_time = recipe.cooking_time || '';
    this.meal = recipe.meal || '';
  }
}
