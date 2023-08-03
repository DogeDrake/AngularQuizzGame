import { WordSectionComponent } from './word-section/word-section.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { RandomComponent } from './random/random.component';
import { QuizComponent } from './quiz/quiz.component';
import { TemaElegidoComponent } from './tema-elegido/tema-elegido.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'quizz', component: QuizSelectionComponent },
  { path: 'random', component: RandomComponent },
  { path: 'todas', component: QuizComponent },
  { path: 'wordsection', component: WordSectionComponent },
  { path: 'tema/:id', component: TemaElegidoComponent },
  // Otras rutas de tu aplicación
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
