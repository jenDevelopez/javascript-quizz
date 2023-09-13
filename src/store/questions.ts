import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist,devtools } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => Promise<void>;
  selectedAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void
}



export const useQuestionStore = create<State>()(devtools(persist((set, get) => {
  return {
    loanding: false,
    questions: [],
    currentQuestion: 0,

    fetchQuestion: async (limit: number) => {
      const res = await fetch("http://localhost:5173/data.json");
      const json = await res.json();
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions }, false, 'FETCH QUESTIONS');
    },
    selectedAnswer: (questionId, answerIndex) => {
      const { questions } = get();
      //usar el strucredClone para clonar el objeto
      const newQuestions = structuredClone(questions);
      //questionIndex
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
      //obtener la informacion de la pregunta
      const questionInfo = newQuestions[questionIndex];
      //averiguar si el usuario a seleccionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
      if (isCorrectUserAnswer) confetti();
      //cambiar esta informacion en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      };
      //actualizar el estado
      set({ questions: newQuestions }, false, 'SELECT ANSWER');
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion }, false, 'NEXT QUESTION');
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previousQuestion = currentQuestion - 1;

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion },false, 'PREVIOUS QUESTION');
      }
    },
    reset: () => set({currentQuestion: 0, questions: []},false, 'RESET')
  };
},{
  name:'questions'
})));
