'use client';

import { useState } from 'react';
import { questions } from '@/data/questions';
import { Answer } from '@/types';
import QuestionCard from './QuestionCard';

interface QuestionnaireFlowProps {
  onComplete: (answers: Answer[]) => void;
}

export default function QuestionnaireFlow({ onComplete }: QuestionnaireFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswer = (answer: Answer) => {
    const newAnswers = answers.filter(a => a.questionId !== answer.questionId);
    newAnswers.push(answer);
    setAnswers(newAnswers);
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);
  const isAnswered = currentAnswer !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              问题 {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          currentAnswer={currentAnswer}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            上一题
          </button>

          <button
            onClick={goToNext}
            disabled={!isAnswered}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              !isAnswered
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : currentQuestionIndex === questions.length - 1
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? '完成' : '下一题'}
          </button>
        </div>

        {/* Question Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentQuestionIndex
                  ? 'bg-blue-500'
                  : answers.some(a => a.questionId === questions[index].id)
                  ? 'bg-green-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
