import { Answer, ColorScheme, UserPreferences } from '@/types';

// HSL颜色工具函数
export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// 解析用户偏好
export function parseUserPreferences(answers: Answer[]): UserPreferences {
  const preferences: UserPreferences = {
    style: '',
    mood: '',
    brightness: 3,
    contrast: 3,
    temperature: '',
    complexity: 3
  };

  answers.forEach(answer => {
    switch (answer.questionId) {
      case 'style':
        preferences.style = answer.value as string;
        break;
      case 'mood':
        preferences.mood = Array.isArray(answer.value) 
          ? (answer.value as string[]).join(',') 
          : answer.value as string;
        break;
      case 'brightness':
        preferences.brightness = answer.value as number;
        break;
      case 'contrast':
        preferences.contrast = answer.value as number;
        break;
      case 'temperature':
        preferences.temperature = answer.value as string;
        break;
      case 'complexity':
        preferences.complexity = answer.value as number;
        break;
    }
  });

  return preferences;
}

// 基于风格获取基础色相
function getBaseHueFromStyle(style: string): number {
  const styleHues: { [key: string]: number } = {
    '现代简约': 210, // 蓝色
    '经典优雅': 280, // 紫色
    '活力时尚': 340, // 粉红色
    '自然清新': 120, // 绿色
    '工业风格': 0    // 红色/灰色
  };
  return styleHues[style] || 210;
}

// 基于色调偏好调整色相
function adjustHueForTemperature(baseHue: number, temperature: string): number {
  switch (temperature) {
    case '暖色调（红、橙、黄）':
      return (baseHue + 30) % 360; // 向暖色调整
    case '冷色调（蓝、绿、紫）':
      return (baseHue + 180) % 360; // 向冷色调整
    case '中性色调（灰、白、黑）':
      return 0; // 无色相
    default:
      return baseHue;
  }
}

// 基于心情调整饱和度
function getSaturationFromMood(mood: string): number {
  const moodSaturations: { [key: string]: number } = {
    '平静放松': 30,
    '充满活力': 80,
    '专业可靠': 50,
    '温暖友好': 60,
    '神秘高级': 40,
    '清新自然': 70
  };

  // 如果是多个心情，取平均值
  if (mood.includes(',')) {
    const moods = mood.split(',');
    const saturations = moods.map(m => moodSaturations[m.trim()] || 50);
    return saturations.reduce((sum, s) => sum + s, 0) / saturations.length;
  }

  return moodSaturations[mood] || 50;
}

// 生成配色方案
export function generateColorScheme(preferences: UserPreferences): ColorScheme {
  const baseHue = getBaseHueFromStyle(preferences.style);
  const adjustedHue = adjustHueForTemperature(baseHue, preferences.temperature);
  const baseSaturation = getSaturationFromMood(preferences.mood);
  
  // 基于亮度偏好调整明度
  const baseLightness = 30 + (preferences.brightness - 1) * 15; // 30-90
  
  // 基于对比度调整颜色差异
  const contrastMultiplier = preferences.contrast / 3;
  
  // 生成主色
  const primaryHue = adjustedHue;
  const primarySaturation = Math.min(100, baseSaturation * contrastMultiplier);
  const primaryLightness = Math.max(20, Math.min(80, baseLightness));
  
  // 生成辅助色（互补色）
  const secondaryHue = (primaryHue + 180) % 360;
  const secondarySaturation = Math.min(100, baseSaturation * 0.8);
  const secondaryLightness = Math.max(30, Math.min(70, baseLightness + 20));
  
  // 生成强调色（三角色）
  const accentHue = (primaryHue + 120) % 360;
  const accentSaturation = Math.min(100, baseSaturation * 1.2);
  const accentLightness = Math.max(40, Math.min(60, baseLightness - 10));
  
  // 生成背景色
  const backgroundLightness = preferences.brightness <= 2 ? 15 : 95;
  const backgroundSaturation = preferences.temperature === '中性色调（灰、白、黑）' ? 0 : 10;
  
  // 生成文字色
  const textLightness = backgroundLightness > 50 ? 20 : 90;
  
  return {
    primary: hslToHex(primaryHue, primarySaturation, primaryLightness),
    secondary: hslToHex(secondaryHue, secondarySaturation, secondaryLightness),
    accent: hslToHex(accentHue, accentSaturation, accentLightness),
    background: hslToHex(primaryHue, backgroundSaturation, backgroundLightness),
    text: hslToHex(0, 0, textLightness)
  };
}

// 生成多个配色方案变体
export function generateColorVariants(preferences: UserPreferences, count: number = 3): ColorScheme[] {
  const variants: ColorScheme[] = [];
  
  for (let i = 0; i < count; i++) {
    // 为每个变体创建轻微的偏好调整
    const variantPreferences = {
      ...preferences,
      brightness: Math.max(1, Math.min(5, preferences.brightness + (i - 1) * 0.5)),
      contrast: Math.max(1, Math.min(5, preferences.contrast + (i - 1) * 0.3))
    };
    
    variants.push(generateColorScheme(variantPreferences));
  }
  
  return variants;
}
