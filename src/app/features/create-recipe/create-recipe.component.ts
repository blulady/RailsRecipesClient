import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Ingredient } from '../../shared/models/ingredient';
import { Category } from '../../shared/models/category';
import { Review } from '../../shared/models/review';
import { RecipeService } from '../../core/services/recipe.service';
import { Measurement } from '../../shared/models/measurement';
import { Recipe } from '../../shared/models/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent implements OnInit {
  isDropdownOpen: boolean = false;
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    servings: new FormControl(""),
    instructions: new FormControl(""),
    difficulty_level: new FormControl(""),
    cooking_time: new FormControl(""),
    meal: new FormControl(""),
    ingredient: new FormControl(""),
    ingredientsIds: new FormArray([]),
    measurementIds: new FormArray([]),
    ingredientAmounts: new FormControl(""),
    categoriesIds: new FormArray([])
  });
  measurements: Measurement[] = [];
  categories: Category[] = [];
  ingredients: Ingredient[] = [];
  // ingredientAmounts: Ingredient_Amount[] = [];
  // reviews: Review[] = [];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.loadMeasurementIds();
  }

  addMeasurementToForm(){
    (this.recipeForm.get("measurementIds") as FormArray).push(new FormControl(false))
  }


  loadMeasurementIds(){
    this.recipeService.getMeasurements().subscribe({
      next: (measurments:any) => {
        this.measurements = measurments;
        measurments.forEach((measurement: Measurement)=>{
          this.addMeasurementToForm();
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  get measurementIds(): FormArray{
    return this.recipeForm.get("measurementIds") as FormArray;
  }

  onCreateRecipe(){
    // console.log(this.recipeForm);
    const measurementIdsFormValue = this.recipeForm.value.measurementIds;
    const measurmentIds = measurementIdsFormValue.map((checked:boolean, i:number)=>{
      return checked ? this.measurements[i].id : null;
    }).filter((id:any) =>{
      return id !==null
    })
    const recipe:Recipe = {
      ...this.recipeForm.value,
    }
    this.recipeService.createRecipe(recipe).subscribe({
      next:() =>{
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  dropdownMenu(){
    this.isDropdownOpen =!this.isDropdownOpen;
  }
}
