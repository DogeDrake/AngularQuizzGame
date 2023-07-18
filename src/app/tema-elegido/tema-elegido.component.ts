import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-tema-elegido',
  templateUrl: './tema-elegido.component.html',
  styleUrls: ['./tema-elegido.component.css'],
})
export class TemaElegidoComponent implements OnInit, OnDestroy {
  quizId: any;
  questions: any;
  currentQuestionIndex: any;
  currentQuestion: any;
  isQuizFinished: boolean = false;
  isAnswerSubmitted: boolean = false;
  isAnswerCorrect: boolean = false;
  score: number = 0;
  totalQuestions: any;
  questionCounter: number = 1;
  countdownSubscription: Subscription | undefined;
  countdownSeconds: number = 20;
  timeRemaining: number = this.countdownSeconds;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.quizId = +params['id'];
      this.loadQuestions();
    });
  }

  ngOnDestroy() {
    this.stopCountdown();
  }

  loadQuestions() {
    this.http
      .get<any[]>(
        `http://localhost:8081/api/quizzes/quizzes/${this.quizId}/questions`
      )
      .subscribe((questions) => {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.isQuizFinished = false;
        this.isAnswerSubmitted = false;
        this.isAnswerCorrect = false;
        this.totalQuestions = this.questions.length;
        this.score = 0;
        this.questionCounter = 1;
        this.startCountdown();
      });
  }

  startCountdown() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.stopCountdown();
        this.submitAnswer();
      }
    });
  }

  stopCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  selectAnswer(answerId: number) {
    this.currentQuestion.selectedAnswer = answerId;
  }

  submitAnswer() {
    this.stopCountdown();
    const isCorrect =
      this.currentQuestion.selectedAnswer ===
      this.currentQuestion.question.correctAnswerId;
    this.currentQuestion.isCorrect = isCorrect;
    this.isAnswerSubmitted = true;
    this.isAnswerCorrect = isCorrect;
    if (isCorrect) {
      this.score += this.timeRemaining;
    }
  }

  nextQuestion() {
    this.isAnswerSubmitted = false;
    this.currentQuestionIndex++;
    this.questionCounter++;
    this.timeRemaining = this.countdownSeconds;

    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.startCountdown();
    } else {
      this.isQuizFinished = true;
      this.stopCountdown();
    }
  }

  restartQuiz() {
    this.loadQuestions();
  }
}
