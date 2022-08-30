import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RecipeItemComponent} from "./recipe-item.component";
import {RouterTestingModule} from "@angular/router/testing";

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        RecipeItemComponent,
      ]
    })

    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeDefined();
  });

})
