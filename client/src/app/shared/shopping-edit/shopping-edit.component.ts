import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DtoIngredient } from "../../dto/dto.recipe";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ShoppingService } from "../../service/shopping.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("formIngredient") formIngredient!: ElementRef;
  shoppingForm!: FormGroup;
  editIndex: number | null = null

  constructor(
    private shoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
    this.shoppingForm = this.formCreate({id: null, name: '', amount: 0});
    this.shoppingService.editIngredient.subscribe((ingredient: DtoIngredient) => {
      this.shoppingForm = this.formCreate({id: ingredient.id, name: ingredient.name, amount: ingredient.amount});
    })
  }

  addShopping() {

    // this.addIngredient.emit({name, amount: Number(amount)});
  }

  formCreate( form: {id?: string | null, name: string, amount: number} ): FormGroup {
    return new FormGroup({
      id: new FormControl(form.id),
      name: new FormControl(form.name,[Validators.required, Validators.minLength(4)]),
      amount: new FormControl(form.amount, [Validators.required]),
    })
  }

  onSubmit() {
    if(!this.shoppingForm.valid) return;
    const formData = new FormData();
    const listData = this.shoppingForm.value;

    for(let key in listData){ formData.append(key, listData[key]) };

    if( !!listData.id.trim() ){
      this.shoppingService.updateIngredient( formData, this.onReset.bind(this));
    } else {
      this.shoppingService.createIngredient(formData, this.onReset.bind(this));
    }
  }

  onReset() {
    this.shoppingForm.reset();
  }

  onDelete() {
    this.shoppingService.deleteIngredient();
    this.onReset()
  }

  get name() { return this.shoppingForm.get('name'); }

  get amount() { return this.shoppingForm.get('amount'); }

}
