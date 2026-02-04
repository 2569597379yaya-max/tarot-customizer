'use client';

import { useState } from 'react';
import { Answer, ColorScheme } from '@/types';
import QuestionnaireFlow from '@/components/QuestionnaireFlow';
import ColorSchemeDisplay from '@/components/ColorSchemeDisplay';
import { parseUserPreferences, generateColorVariants } from '@/utils/colorGenerator';

type AppState = 'welcome' | 'questionnaire' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [colorSchemes, setColorSchemes] = useState<ColorScheme[]>([]);

  const handleQuestionnaireComplete = (answers: Answer[]) => {
    const preferences = parseUserPreferences(answers);
    const schemes = generateColorVariants(preferences, 3);
    setColorSchemes(schemes);
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('welcome');
    setColorSchemes([]);
  };

  if (appState === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              🎨 智能配色定制器
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              通过简单的问答，为你生成专属的配色方案，并以3D形式实时预览效果
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❓</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">简单问答</h3>
                <p className="text-sm text-gray-600">回答几个关于你偏好的问题</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">智能生成</h3>
                <p className="text-sm text-gray-600">AI为你生成专属配色方案</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">3D预览</h3>
                <p className="text-sm text-gray-600">实时查看配色在产品上的效果</p>
              </div>
            </div>

            <button
              onClick={() => setAppState('questionnaire')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              开始定制我的配色 →
            </button>
          </div>

          <div className="text-sm text-gray-500">
            <p>💡 提示：整个过程只需要2-3分钟</p>
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'questionnaire') {
    return <QuestionnaireFlow onComplete={handleQuestionnaireComplete} />;
  }

  if (appState === 'results') {
    return (
      <div>
        <ColorSchemeDisplay colorSchemes={colorSchemes} />
        <div className="fixed bottom-4 right-4">
          <button
            onClick={handleRestart}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-lg"
          >
            重新开始
          </button>
        </div>
      </div>
    );
  }

  return null;
}
