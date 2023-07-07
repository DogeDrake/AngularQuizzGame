import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quizData: any;
  currentQuestion: any;
  selectedAnswer: any;
  isAnswered: boolean = false;
  isCorrect: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getNextQuestion();
  }

  getNextQuestion(): void {
    this.http
      .get('http://localhost:8081/api/quizzes/questions/1/details')
      .subscribe((data: any) => {
        this.quizData = data;
        this.currentQuestion = this.quizData.question;
        this.selectedAnswer = null;
        this.isAnswered = false;
        this.isCorrect = false;
      });
  }

  selectAnswer(answer: any): void {
    if (!this.isAnswered) {
      this.selectedAnswer = answer;
    }
  }

  checkAnswer(): void {
    if (this.selectedAnswer) {
      this.isAnswered = true;
      this.isCorrect = this.selectedAnswer.isCorrect;
      if (this.isCorrect) {
        this.selectedAnswer = null;
        setTimeout(() => {
          this.getNextQuestion();
        }, 5000);
      }
    }
  }

  getCorrectAnswerText(): string {
    const correctAnswer = this.currentQuestion.answers.find(
      (answer: any) => answer.isCorrect
    );
    return correctAnswer ? correctAnswer.answerText : '';
  }
}
