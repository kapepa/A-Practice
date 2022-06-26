import {Component, EventEmitter, OnInit} from '@angular/core';
import {DtoRecipe} from "../../dto/dto.recipe";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  select: DtoRecipe = {} as DtoRecipe
  constructor() { }

  ngOnInit(): void {
    // this.selectRecipe.subscribe(data => console.log(data))
  }

  selectRecipe(recipe: DtoRecipe) {
    // this.select.emit(recipe)
    // console.log(this.select)
  }

}
