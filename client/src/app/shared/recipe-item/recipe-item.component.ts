import {Component, Input, OnInit} from '@angular/core';
import {DtoRecipe} from "../../dto/dto.recipe";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: DtoRecipe;

  constructor() { }

  ngOnInit(): void {
  }

}
