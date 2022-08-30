import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { DtoRecipe } from "../../dto/dto.recipe";
import { RecipeService } from "../../service/recipe.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: DtoRecipe[];
  recipesSub!: Subscription;
  editFlag: boolean = false;
  editFlagSubject: Subject<boolean> = new Subject<boolean>()
  // @Output() selectRecipe = new EventEmitter<DtoRecipe>()

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipe({take: 5, skip: 0});
    this.recipes = this.recipeService.getRecipesAll;
    this.recipesSub = this.recipeService.recipesList.subscribe((recipes: DtoRecipe[]) => {
      this.recipes = recipes;
    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { urlAfterRedirects } = event;
        const edit = urlAfterRedirects.split('/').pop() === 'edit';
        if ( this.editFlag !== edit ) {
          this.editFlag = ! this.editFlag;
          this.editFlagSubject.next(this.editFlag)
        }
      };
    })
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();
  }

  newRouter() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  addEdit (data: {id: string, index: number | null}) {
    this.recipeService.setIndex(data.index);
    if( this.editFlag ) this.recipeService.getRecipeEdit(data.id);
  }
};
