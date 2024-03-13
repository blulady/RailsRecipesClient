import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  @Input({required: true}) recipe: Recipe = new Recipe({})
}

