import { Question } from '@/types';

export const questions: Question[] = [
  {
    id: 'style',
    text: '你更喜欢哪种设计风格？',
    type: 'single',
    options: [
      '现代简约',
      '经典优雅',
      '活力时尚',
      '自然清新',
      '工业风格'
    ]
  },
  {
    id: 'mood',
    text: '你希望这个配色给人什么感觉？',
    type: 'multiple',
    options: [
      '平静放松',
      '充满活力',
      '专业可靠',
      '温暖友好',
      '神秘高级',
      '清新自然'
    ]
  },
  {
    id: 'brightness',
    text: '你偏好的亮度如何？',
    type: 'scale',
    scaleRange: {
      min: 1,
      max: 5,
      labels: ['很暗', '较暗', '适中', '较亮', '很亮']
    }
  },
  {
    id: 'contrast',
    text: '你希望颜色对比度如何？',
    type: 'scale',
    scaleRange: {
      min: 1,
      max: 5,
      labels: ['很低', '较低', '适中', '较高', '很高']
    }
  },
  {
    id: 'temperature',
    text: '你更偏向哪种色调？',
    type: 'single',
    options: [
      '暖色调（红、橙、黄）',
      '冷色调（蓝、绿、紫）',
      '中性色调（灰、白、黑）',
      '混合色调'
    ]
  },
  {
    id: 'complexity',
    text: '你希望配色方案的复杂程度如何？',
    type: 'scale',
    scaleRange: {
      min: 1,
      max: 5,
      labels: ['极简', '简单', '适中', '丰富', '复杂']
    }
  }
];
