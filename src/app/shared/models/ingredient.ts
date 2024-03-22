export class Ingredient {
  id?: number;
  name: string;

  constructor(ingredient:any) {
    this.id = ingredient.id;
    this.name = ingredient.name;
  }
}
