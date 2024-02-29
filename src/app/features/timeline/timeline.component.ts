import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { RecipeComponent } from '../../shared/components/recipes/recipe/recipe.component';
import { RecipeService } from '../../core/services/recipe.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [RecipeComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService:RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getTimeLineRecipes().subscribe({
      next: (recipes:Recipe[]) =>{
        this.recipes = recipes;
      },
      error: (error:any) => {
        console.error('Error fetching timeline recipes', error);
      }
    })
  }
}
