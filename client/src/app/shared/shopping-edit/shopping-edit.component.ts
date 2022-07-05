import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DtoIngredient } from "../../dto/dto.recipe";
import {FormControl, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("shoppingName") shoppingName!: ElementRef;
  @ViewChild("shoppingAmount") shoppingAmount!: ElementRef;
  @Output() addIngredient = new EventEmitter<DtoIngredient>()
  shoppingForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl(''),
      amount: new FormControl(''),
    });
  }

  addShopping() {
    const name = this.shoppingName.nativeElement.value;
    const amount = this.shoppingAmount.nativeElement.value;
    this.addIngredient.emit({name, amount: Number(amount)});
  }

  onSubmit() {
    const name = this.shoppingName.nativeElement.value;
    const amount = this.shoppingAmount.nativeElement.value;
    this.addIngredient.emit({name, amount: Number(amount)});
  }

}
