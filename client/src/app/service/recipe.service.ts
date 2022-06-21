import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public name!: string;
  public description!: string;
  public image!: string;

  // constructor(name: string, description: string, image: string) {
  //   this.name = name;
  //   this.description = description;
  //   this.image = image;
  // }

}
