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
      .subscribe((response) => {
        this.questions = response.map((item: any) => {
          const question = item;
          question.answers = this.shuffleAnswers(item.answers);
          return question;
        });
        this.totalQuestions = this.questions.length;
        this.shuffleQuestions();
        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.isQuizFinished = false;
        this.isAnswerSubmitted = false;
        this.isAnswerCorrect = false;
        this.score = 0;
        this.questionCounter = 1;
        this.startCountdown();
      });
  }

  stopCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  shuffleAnswers(answers: any[]) {
    const shuffledAnswers = [...answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [
        shuffledAnswers[j],
        shuffledAnswers[i],
      ];
    }
    return shuffledAnswers;
  }

  selectAnswer(answerId: number) {
    this.currentQuestion.selectedAnswer = answerId;
  }

  submitAnswer() {
    this.stopCountdown();
    const selectedAnswer = this.currentQuestion.answers.find(
      (answer: any) => answer.answerId === this.currentQuestion.selectedAnswer
    );
    const isCorrect = selectedAnswer.isCorrect;
    this.currentQuestion.isCorrect = isCorrect || this.timeRemaining === 0;
    this.isAnswerSubmitted = true;
    this.isAnswerCorrect = isCorrect;
    if (isCorrect) {
      this.score += this.timeRemaining;
    }
  }

  startCountdown() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.stopCountdown();
        this.isAnswerSubmitted = true;
        this.isAnswerCorrect = false;
        this.currentQuestion.selectedAnswer = null;
      }
    });
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
