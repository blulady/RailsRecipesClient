import { Injectable } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  getTimeLineRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${environment.apiUrl}/recipes`)
  }
}
