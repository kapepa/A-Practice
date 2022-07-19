import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DtoRecipe } from "../../dto/dto.recipe";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  url: string = environment.configUrl
  edit: boolean = false;
  @Input() editFlagSubject!: Subject<boolean>;
  @Input() recipe!: DtoRecipe;
  @Input() index!: number;
  @Output() recipeSelected = new EventEmitter<DtoRecipe>()
  @Output() addEdit = new EventEmitter<number>()

  constructor(
    private router: Router,
  ) {  }

  ngOnInit(): void {
    this.editFlagSubject.subscribe((bool: boolean) => {
      this.edit = bool;
    })
  }

  selectEdit(){
    this.addEdit.emit(this.index)
  }

  selectClick () {
    this.recipeSelected.emit(this.recipe);
  }

}
