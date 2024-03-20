import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../core/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../shared/models/recipe';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = new Recipe({});
  category: Category = new Category({});
  // TADA add a link to this component that allows people to review this recipe

  constructor(private recipeService: RecipeService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe((params) =>{
        this.recipeService.getRecipe(params['id']).subscribe({
          next: (recipe:Recipe) =>{
            this.recipe = recipe;
            console.log(this.recipe)
            console.log(this.recipe.categories)
            console.log(this.recipe.reviews)
            console.log(this.recipe.reviews[0].user.first_name)
          },
          error: (error)=>{
            console.log(error);
          }
        })
  })}
}
