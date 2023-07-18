import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { RandomComponent } from './random/random.component';
import { QuizComponent } from './quiz/quiz.component';
import { TemaElegidoComponent } from './tema-elegido/tema-elegido.component';

const routes: Routes = [
  { path: '', component: QuizSelectionComponent },
  { path: 'random', component: RandomComponent },
  { path: 'todas', component: QuizComponent },
  { path: 'tema/:id', component: TemaElegidoComponent },
  // Otras rutas de tu aplicación
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
