import {Component, OnDestroy, OnInit} from '@angular/core';
import { RecipeService } from "../../service/recipe.service";
import { Subscription } from "rxjs";
import { DtoIngredient, DtoRecipe } from "../../dto/dto.recipe";
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  // data = {
  //   companies: [
  //     {
  //       company: 'example comany',
  //     }
  //   ]
  // };
  //
  // myForm!: FormGroup;
  //
  // constructor(private fb: FormBuilder) {}
  //
  // ngOnInit(): void {
  //   this.myForm = this.fb.group({
  //     companies: this.fb.array([ this.fb.group({company: 'test'})])
  //   });
  //   // this.setCompanies();
  // }
  //
  // get companiesFormArr(): FormArray {
  //   return this.myForm.get('companies') as FormArray;
  // }
  //
  // addNewCompany() {
  //   this.companiesFormArr.push(
  //     this.fb.group({
  //       company: [''],
  //       projects: this.fb.array([])
  //     })
  //   );
  // }
  //
  // deleteCompany(index: any) {
  //   this.companiesFormArr.removeAt(index);
  // }
  //
  // addNewProject(control: any) {
  //   control.push(
  //     this.fb.group({
  //       projectName: ['']
  //     })
  //   );
  // }
  //
  // deleteProject(control: any, index: any) {
  //   control.removeAt(index);
  // }
  //
  // setCompanies() {
  //   this.data.companies.forEach(x => {
  //     this.companiesFormArr.push(
  //       this.fb.group({
  //         company: x.company,
  //       })
  //     );
  //   });
  // }
  //
  //
  // setProjects(x: any) {
  //   let arr = new FormArray([]);
  //   return arr;
  // }
  //
  // ngOnDestroy() {
  // }

  editMode: boolean = false;
  editRecipe: DtoRecipe = {} as DtoRecipe;
  editSubject!: Subscription;
  recipeForm!: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.editRecipe = this.recipeService.editRecipe$;
    this.editSubject = this.recipeService.editRecipe.subscribe((recipe: DtoRecipe) => {
      this.editMode = false;
      this.editRecipe = recipe;
    });

    this.recipeForm = this.fb.group({
      name: '',
      imageUrl: '',
      ingredients: this.fb.array([this.fb.group({ name: '', amount: 0})] )
    });
  }

  ngOnDestroy() {
    this.editSubject.unsubscribe()
  }

  onSubmit() {

  }

  appendRecipe() {
    this.ingredientsArr.push(this.fb.group({name: '121', amount: 0}));
  }

  receiveIngredient(i: number, key: string) {
    return this.recipeForm.get('ingredients')
  }

  get ingredientsArr() {
    return this.recipeForm.get('ingredients') as FormArray;
  }


}
