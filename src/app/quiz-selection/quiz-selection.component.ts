import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.css'],
})
export class QuizSelectionComponent implements OnInit {
  quizzes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  selectQuiz(quizId: number) {
    this.router.navigate(['/tema', quizId]);
  }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  redirectToRandom() {
    this.router.navigateByUrl('/random');
  }

  navigateToQuiz() {
    this.router.navigate(['/todas']);
  }

  loadQuizzes(): void {
    // Llama a la API para obtener la lista de quizzes
    this.http
      .get<any[]>('http://localhost:8081/api/quizzes/quizzes')
      .subscribe((quizzes) => {
        this.quizzes = quizzes;
      });
  }

  selectRandomQuiz(): void {
    // Implementa la lógica para seleccionar un quiz aleatorio
    console.log('Quiz aleatorio seleccionado');
  }

  selectAllQuizzes(): void {
    // Implementa la lógica para seleccionar todos los quizzes
    console.log('Todos los quizzes seleccionados');
  }
}
