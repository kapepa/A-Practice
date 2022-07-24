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
    this.shoppingForm = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.minLength(4)]),
        amount: new FormControl('', [Validators.required]),
    });

    // this.shoppingService.editIndex.subscribe(( index: number | null) => this.editIndex = index );
  }

  addShopping() {

    // this.addIngredient.emit({name, amount: Number(amount)});
  }

  onSubmit() {
    if(!this.shoppingForm.valid) return;
    const formData = new FormData();
    const listData = this.shoppingForm.value;

    for(let key in listData){ formData.append(key, listData[key]) };

    this.shoppingService.createIngredient(formData, this.onReset.bind(this));
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
