import { Injectable } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Measurement } from '../../shared/models/measurement';

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

  createRecipe(recipe:Recipe){
    return this.http.post<Recipe>(`${environment.apiUrl}/recipes`, recipe)
  }
}
