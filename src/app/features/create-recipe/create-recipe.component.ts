import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Ingredient } from '../../shared/models/ingredient';
import { Category } from '../../shared/models/category';
import { Review } from '../../shared/models/review';
import { RecipeService } from '../../core/services/recipe.service';
import { Measurement } from '../../shared/models/measurement';
import { Recipe } from '../../shared/models/recipe';
import { RecipeIngredient } from '../../shared/models/recipe-ingredient';
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
    ingredientAmount: new FormControl(""),
    categoriesIds: new FormArray([])
  });
  measurements: Measurement[] = [];
  categories: Category[] = [];
  ingredients: Ingredient[] = [];
  // ingredientAmounts: Ingredient_Amount[] = [];
  // reviews: Review[] = [];
  ingredient = '';
  // ingredientAmount = 0;
  ingredientMeasurement = '';
  recipe_id = 0;


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
    console.log(this.recipeForm);
    const measurementIdsFormValue = this.recipeForm.value.measurementIds;
    const measurmentIds = measurementIdsFormValue.map((checked:boolean, i:number)=>{
      return checked ? this.measurements[i].id : null;
    }).filter((id:any) =>{
      return id !==null
    })
    const recipe:Recipe = {
      ...this.recipeForm.value,
    }


    this.ingredientMeasurement = "cup"

    const ingredient:Ingredient = {
      name: this.recipeForm.value.ingredient
    }

    const ingredientAmount = this.recipeForm.value.ingredientAmount;

    this.recipeService.createRecipe(recipe).subscribe({
      next: (recipe: Recipe) => {
        this.router.navigate(['/']);
        recipe.id = recipe.id;
        console.log(recipe.id);

        this.recipeService.createIngredient(ingredient).subscribe({
          next: (ingredient: Ingredient) => {
            console.log(ingredient);
            ingredient.id = ingredient.id;
            console.log(ingredient.id);
            console.log(ingredientAmount);
            const recipeIngredient: RecipeIngredient = {
              recipe_id: recipe.id,
              ingredient_id: ingredient.id || 1,
              measurement_id: 2,
              ingredient_amount: ingredientAmount * 1
            };
            console.log(recipeIngredient);
            this.recipeService.createRecipeIngredient(recipeIngredient).subscribe({
              next: (recipeIngredient: RecipeIngredient) => {
                console.log(recipeIngredient);
              }
            })

          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });


    // this.recipeService.createRecipe(recipe).subscribe({
    //   next: (recipe: Recipe) => {
    //     this.router.navigate(['/']);
    //     recipe.id = recipe.id;
    //     console.log(recipe.id);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
    // this.recipeService.createIngredient(ingredient).subscribe({
    //   next: (ingredient:Ingredient) => {
    //     console.log(ingredient);
    //     ingredient.id = ingredient.id;
    //     console.log(ingredient.id);
    //     console.log(ingredientAmount);
    //     const recipeIngredient:RecipeIngredient = {
    //       recipe_id: this.recipe_id,
    //       ingredient_id: ingredient.id || 1,
    //       measurement_id: 2,
    //       ingredient_amount: ingredientAmount * 1
    //     };
    //     console.log(recipeIngredient);

    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })

    // this.recipeService.createIngredient(ingredient).subscribe({
    //   next: (ingredient:Ingredient) => {
    //     console.log(ingredient);
    //     ingredient.id = ingredient.id;
    //     console.log(ingredient.id);

    //     recipeIngredient = {
    //       recipe_id: recipe.id,
    //       ingredient_id: ingredient.id,
    //       measurement_id: 2,
    //       amount: this.ingredientAmount,
    //       unit: this.ingredientMeasurement
    //     }
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })



  }

  dropdownMenu(){
    this.isDropdownOpen =!this.isDropdownOpen;
  }
}
