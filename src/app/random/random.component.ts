import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz-service.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
})
export class RandomComponent implements OnInit {
  quizzes: any[] = [];
  selectedQuiz: any;
  spinning: boolean = false;
  winnerSelected: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.getQuizzes();
  }

  getQuizzes() {
    this.quizService.getQuizzes().subscribe((data: any[]) => {
      this.quizzes = data;
    });
  }

  startSpinning() {
    if (this.spinning) {
      return;
    }
    this.spinning = true;
    this.selectedQuiz = null;
    this.winnerSelected = false;
    this.spinWheel();
  }

  spinWheel() {
    const totalTime = 5000; // Tiempo total de la animación (en milisegundos)
    const delay = 100; // Retardo entre actualizaciones de la ruleta (en milisegundos)
    const frames = totalTime / delay; // Número de actualizaciones de la ruleta

    let counter = 0;
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex = counter % this.quizzes.length;
      this.selectedQuiz = this.quizzes[currentIndex];
      counter++;

      if (counter === frames) {
        clearInterval(intervalId);
        this.spinning = false;
        this.winnerSelected = true;
      }
    }, delay);
  }
}
