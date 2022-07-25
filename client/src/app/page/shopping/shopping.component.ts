import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ShoppingService } from "../../service/shopping.service";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  title = 'Shopping';

  constructor(
    private shoppingService: ShoppingService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Shopping");
  }

  ngOnInit(): void {
    this.shoppingService.getIngredientPage();
  }

}
