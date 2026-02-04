'use client';

import { Question, Answer } from '@/types';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
  currentAnswer?: Answer;
}

export default function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string | string[] | number>(
    currentAnswer?.value || (question.type === 'multiple' ? [] : question.type === 'scale' ? 3 : '')
  );

  const handleSingleChoice = (value: string) => {
    setSelectedValue(value);
    onAnswer({ questionId: question.id, value });
  };

  const handleMultipleChoice = (value: string) => {
    const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setSelectedValue(newValues);
    onAnswer({ questionId: question.id, value: newValues });
  };

  const handleScaleChange = (value: number) => {
    setSelectedValue(value);
    onAnswer({ questionId: question.id, value });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{question.text}</h3>
      
      {question.type === 'single' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSingleChoice(option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedValue === option
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {question.type === 'multiple' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleMultipleChoice(option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                Array.isArray(selectedValue) && selectedValue.includes(option)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded border-2 mr-3 ${
                  Array.isArray(selectedValue) && selectedValue.includes(option)
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300'
                }`}>
                  {Array.isArray(selectedValue) && selectedValue.includes(option) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {option}
              </div>
            </button>
          ))}
        </div>
      )}

      {question.type === 'scale' && question.scaleRange && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{question.scaleRange.labels[0]}</span>
            <span>{question.scaleRange.labels[question.scaleRange.labels.length - 1]}</span>
          </div>
          <div className="flex justify-between items-center">
            {question.scaleRange.labels.map((label, index) => {
              const value = index + 1;
              return (
                <div key={index} className="flex flex-col items-center">
                  <button
                    onClick={() => handleScaleChange(value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedValue === value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  />
                  <span className="text-xs text-gray-500 mt-2 text-center">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
