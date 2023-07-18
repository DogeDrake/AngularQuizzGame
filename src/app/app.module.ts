import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { AppRoutingModule } from './app-routing.module';
import { RandomComponent } from './random/random.component';
import { TemaElegidoComponent } from './tema-elegido/tema-elegido.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizSelectionComponent,
    RandomComponent,
    TemaElegidoComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
