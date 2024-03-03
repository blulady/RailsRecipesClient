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
  currentPage: number = 1;
  totalPages: number = 0;


  constructor(private recipeService:RecipeService) {}


  ngOnInit(): void {
      this.loadRecipes(this.currentPage);
  }

  loadRecipes(page: number) {
    this.recipeService.getRecipes(page).subscribe({
      next: (response:any) => {
        this.recipes = response.recipes;
        this.currentPage = response.current_page;
        this.totalPages = response.total_pages
      },
      error: (error:any) =>{
        console.error("recipe fetching gone wrong", error)
      }
    })
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.loadRecipes(this.currentPage +1 )
    }
  }

  previousPage(){
    if(this.currentPage > 1){
      this.loadRecipes(this.currentPage - 1)
    }
  }
}
