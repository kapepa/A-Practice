import { Component, OnInit } from '@angular/core';
import { ShoppingService } from "../../service/shopping.service";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  constructor(
    private shoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
    this.shoppingService.getAllIngredient();
  }

}
