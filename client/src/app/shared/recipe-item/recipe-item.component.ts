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
  edit: boolean = false;
  @Input() editFlagSubject!: Subject<boolean>;
  @Input() recipe!: DtoRecipe;
  @Input() index!: number;
  @Output() addEdit = new EventEmitter<{id: string, index: number}>()

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.editFlagSubject.subscribe((bool: boolean) => {
      this.edit = bool;
    })
  }

  selectEdit(){
    this.addEdit.emit({id: this.recipe.id, index: this.index})
  }
}
