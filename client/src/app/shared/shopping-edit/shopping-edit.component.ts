import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DtoIngredient } from "../../dto/dto.recipe";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("shoppingName") shoppingName!: ElementRef;
  @ViewChild("shoppingAmount") shoppingAmount!: ElementRef;
  @Output() addIngredient = new EventEmitter<DtoIngredient>()

  constructor() { }

  ngOnInit(): void {
  }

  addShopping() {
    const name = this.shoppingName.nativeElement.value;
    const amount = this.shoppingAmount.nativeElement.value;
    this.addIngredient.emit({name, amount: Number(amount)});
  }

}
