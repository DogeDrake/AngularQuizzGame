import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

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
  correctAnswer: any;

  constructor(private http: HttpClient) {}

  private countdownSubscription: Subscription | undefined;
  private countdownSeconds: number = 20;
  public timeRemaining: number = this.countdownSeconds;
  public score: number = 0;

  ngOnInit(): void {
    this.startCountdown();
    this.getNextQuestion();
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  startCountdown(): void {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.stopCountdown();
        this.isAnswered = true;
        this.isCorrect = false;
        this.selectedAnswer = null;
      }
    });
  }

  stopCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  getNextQuestion(): void {
    const randomQuestionId = this.getRandomQuestionId();
    const apiUrl = `http://localhost:8081/api/quizzes/questions/${randomQuestionId}/details`;
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.quizData = data;
        this.currentQuestion = this.quizData.question;
        this.selectedAnswer = null;
        this.isAnswered = false;
        this.isCorrect = false;
        this.correctAnswer = this.getCorrectAnswer();
        this.shuffleAnswers();
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }

  shuffleAnswers(): void {
    const shuffledAnswers = [...this.quizData.answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [
        shuffledAnswers[j],
        shuffledAnswers[i],
      ];
    }
    this.quizData.answers = shuffledAnswers;
  }

  selectAnswer(answer: any): void {
    if (!this.isAnswered) {
      this.selectedAnswer = answer;
    }
  }

  checkAnswer(): void {
    if (this.selectedAnswer) {
      this.stopCountdown();
      this.isAnswered = true;
      this.isCorrect = this.selectedAnswer.isCorrect;
      if (this.isCorrect) {
        this.score += this.timeRemaining;
      }
    }
  }

  submitQuestion(): void {
    this.selectedAnswer = null;
    this.getNextQuestion();
    this.timeRemaining = this.countdownSeconds;
    this.startCountdown();
  }

  getCorrectAnswer(): any {
    if (this.currentQuestion && this.currentQuestion.answers) {
      return this.currentQuestion.answers.find(
        (answer: any) => answer.isCorrect
      );
    }
    return null;
  }
  getRandomQuestionId(): number {
    const min = 1; // Mínimo ID de pregunta
    const max = 19; // Máximo ID de pregunta (ajusta según tus necesidades)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  isAnswerIncorrect(answer: any): boolean {
    return this.isAnswered && !this.isCorrect && this.selectedAnswer === answer;
  }
}
