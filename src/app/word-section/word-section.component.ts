import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-word-section',
  templateUrl: './word-section.component.html',
  styleUrls: ['./word-section.component.css'],
})
export class WordSectionComponent implements OnInit {
  apiUrl = 'http://localhost:8081/api/palabras';
  words: any[] = [];
  selectedDefinition: string = '';
  currentWordIndex: number = 0;
  guessStatus: string[] = [];
  isGameOver: boolean = false;
  userAnswer = '';
  resultMessage = '';
  correctCount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadWords();
  }

  checkAnswer(answer: string) {
    const currentWord = this.words[this.currentWordIndex].palabra.toLowerCase();

    console.log('Pregunta:', currentWord); // Log de la palabra que se está preguntando

    if (answer.toLowerCase() === currentWord) {
      this.guessStatus[this.currentWordIndex] = 'correct';
      this.correctCount++;
      this.resultMessage = 'Correct!';
    } else {
      this.guessStatus[this.currentWordIndex] = 'incorrect';
      this.resultMessage = 'Incorrect!';
    }

    console.log('Respuesta correcta:', currentWord); // Log de la respuesta correcta

    if (this.currentWordIndex < this.words.length - 1) {
      this.currentWordIndex++;
      this.updateSelectedDefinition();
    } else {
      this.isGameOver = true;
    }
  }

  skipWord() {
    this.guessStatus[this.currentWordIndex] = 'skipped';

    if (this.currentWordIndex < this.words.length - 1) {
      this.currentWordIndex++;
      this.updateSelectedDefinition();
    } else {
      this.isGameOver = true;
    }
  }

  loadWords() {
    this.http.get<any[]>(this.apiUrl).subscribe((response) => {
      this.words = response;
      this.shuffleWords();
      this.initializeGuessStatus();
      this.updateSelectedDefinition();
      this.words = this.words.slice(0, 5); // Mostrar solo 5 palabras
      this.shuffleSelectedWords(); // Aleatorizar el orden de las palabras seleccionadas
    });
  }

  shuffleWords() {
    for (let i = this.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
    }
  }

  initializeGuessStatus() {
    this.guessStatus = new Array(this.words.length).fill('');
  }

  updateSelectedDefinition() {
    this.selectedDefinition = this.words[this.currentWordIndex].definicion;
  }

  shuffleSelectedWords() {
    const selectedWords = this.words.map((word) => word.palabra);
    for (let i = selectedWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedWords[i], selectedWords[j]] = [
        selectedWords[j],
        selectedWords[i],
      ];
    }
    this.words.forEach((word, index) => {
      word.palabra = selectedWords[index].toLowerCase(); // Convertir a minúsculas
    });
  }
}
