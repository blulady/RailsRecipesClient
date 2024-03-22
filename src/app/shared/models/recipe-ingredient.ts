export class RecipeIngredient {
  id?: number;
  recipe_id: number;
  ingredient_id: number;
  measurement_id: number;
  ingredient_amount: number;

  constructor(recipeIngredient:any) {
    this.id = recipeIngredient.id || 0;
    this.recipe_id = recipeIngredient.recipe_id || 0;
    this.ingredient_id = recipeIngredient.ingredient_id || 0;
    this.measurement_id = recipeIngredient.measurement_id || 0;
    this.ingredient_amount = recipeIngredient.ingredient_amount || 0;
  }
}
