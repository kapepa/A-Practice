import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DtoIngredient } from "../../dto/dto.recipe";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ShoppingService } from "../../service/shopping.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("shoppingName") shoppingName!: ElementRef;
  @ViewChild("shoppingAmount") shoppingAmount!: ElementRef;
  @ViewChild("formIngredient") formIngredient!: ElementRef;
  @Output() addIngredient = new EventEmitter<DtoIngredient>()
  shoppingForm!: FormGroup;
  editIndex: number | null = null

  constructor(
    private shoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
    this.shoppingService.editIngredient.subscribe((ingredient: DtoIngredient) => {
      this.shoppingName.nativeElement.value = ingredient.name;
      this.shoppingAmount.nativeElement.value = ingredient.amount
    })
    this.shoppingService.editIndex.subscribe(( index: number | null) => this.editIndex = index );
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
    this.shoppingName.nativeElement.value = '';
    this.shoppingAmount.nativeElement.value = '';
  }

  onReset() {
    const name = this.shoppingName.nativeElement.value;
    const amount = this.shoppingAmount.nativeElement.value;
    if(name.trim() !== '' || amount.trim() !== '') this.shoppingService.selectEdit(null);
    this.formIngredient.nativeElement.reset();
  }

  onDelete() {
    this.shoppingService.deleteIngredient();
    this.onReset()
  }

}
