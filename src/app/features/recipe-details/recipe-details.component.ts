import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../core/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../shared/models/recipe';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = new Recipe({});

  constructor(private recipeService: RecipeService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe((params) =>{
        this.recipeService.getRecipe(params['id']).subscribe({
          next: (recipe:Recipe) =>{
            this.recipe = recipe;
            console.log(this.recipe)
          },
          error: (error)=>{
            console.log(error);
          }
        })
  })}
}
