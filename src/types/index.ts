export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options?: string[];
  scaleRange?: { min: number; max: number; labels: string[] };
}

export interface Answer {
  questionId: string;
  value: string | string[] | number;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface UserPreferences {
  style: string;
  mood: string;
  brightness: number;
  contrast: number;
  temperature: string;
  complexity: number;
}
