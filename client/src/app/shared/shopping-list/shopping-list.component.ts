import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {ShoppingService} from "../../service/shopping.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: DtoIngredient[] = [] as DtoIngredient[];
  private ngIngredient!: Subscription;

  constructor(
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    // this.ingredients = this.shoppingService.getIngredientList;
    this.shoppingService.ingredient.subscribe((ingredients: DtoIngredient[]) => {
      this.ingredients = ingredients;
    })
  }

  editIngredient(index: number) {
    this.shoppingService.selectEdit(index)
  }

  appendIngredient() {
    this.shoppingService.getIngredientRequest();
  }

}
