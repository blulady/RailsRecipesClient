import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe';
@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  @Input({required: true}) recipe: Recipe = new Recipe({})
}

