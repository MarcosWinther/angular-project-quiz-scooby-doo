import { Component, OnInit } from '@angular/core';

import quiz_questions  from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  public title:string = '';

  public photoCover:string = '';

  public questions:any;
  public questionSelected:any;

  public answers:string[] = [];
  public answerSelected:string = '';

  public questionIndex:number = 0;
  public questionMaxIndex:number = 0;

  public finished:boolean = false;

  ngOnInit(): void {
    if(quiz_questions) {
      this.finished = false;
      this.title = quiz_questions.title;

      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.photoCover = this.questions[this.questionIndex].photoCover;

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value:string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex+=1;

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
      this.photoCover = this.questions[this.questionIndex].photoCover;
    } else {
      const finalAnswer:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results];
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result;
  }

}
