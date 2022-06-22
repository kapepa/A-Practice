import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  // name!: string;
  // amount!: number;

  constructor(private name: any, private amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
