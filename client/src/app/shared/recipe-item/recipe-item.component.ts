import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoRecipe} from "../../dto/dto.recipe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: DtoRecipe;
  @Output() recipeSelected = new EventEmitter<DtoRecipe>()

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  selectClick () {
    this.recipeSelected.emit(this.recipe);
  }

}
