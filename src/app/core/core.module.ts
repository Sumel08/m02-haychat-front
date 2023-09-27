import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

const materialModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatDividerModule,
];

const generalModules = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...materialModules, ...generalModules],
  exports: [...materialModules, ...generalModules],
})
export class CoreModule {}
