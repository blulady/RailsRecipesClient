import { Injectable } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Measurement } from '../../shared/models/measurement';
import { Ingredient } from '../../shared/models/ingredient';
import { RecipeIngredient } from '../../shared/models/recipe-ingredient';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  getTimeLineRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${environment.apiUrl}/recipes`)
  }

  getRecipes(page:number){
    return this.http.get<Recipe[]>(`${environment.apiUrl}/recipes?page=${page}`)
  }
  getRecipe(id:string | number){
    return this.http.get<Recipe>(`${environment.apiUrl}/recipes/${id}`)
  }

  getMeasurements(): Observable<Measurement[]>{
    return this.http.get<Measurement[]>(`${environment.apiUrl}/measurements`)
  }

  getIngredientByName(name:string | number){
    return this.http.get<Ingredient>(`${environment.apiUrl}/ingredients/name/${name}`)
  }

  createRecipe(recipe:Recipe){
    return this.http.post<Recipe>(`${environment.apiUrl}/recipes`, recipe)
  }
  createIngredient(ingredient:Ingredient){
    return this.http.post<Ingredient>(`${environment.apiUrl}/ingredients`, ingredient)
  } //will need to grab id for entry into recipe_ingredients?

  createIngredientMeasurment(measurement:Measurement){
    return this.http.post<Measurement>(`${environment.apiUrl}/measurements`, measurement)
  } //will need to grab id for entry into recipe_ingredients?

  createRecipeIngredient(recipe_ingredients:RecipeIngredient){
    return this.http.post<RecipeIngredient>(`${environment.apiUrl}/recipe_ingredients`, recipe_ingredients)
  } //will need to grab id for entry into recipe_ingredients?

}
