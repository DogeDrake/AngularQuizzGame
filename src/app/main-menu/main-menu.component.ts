import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent {
  constructor(private http: HttpClient, private router: Router) {}

  navigateToQuiz() {
    this.router.navigate(['/quizz']);
  }

  navigateToWord() {
    this.router.navigate(['/wordsection']);
  }
}
