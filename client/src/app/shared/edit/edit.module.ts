import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipeModule } from "../../pipe/pipe.module";



@NgModule({
  declarations: [
    EditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
  ],
  exports: [
    EditComponent,
  ]
})
export class EditModule { }
