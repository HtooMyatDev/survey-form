// Theme colors and styling constants
export const THEME = {
  primary: '#FF1493',
  secondary: '#FFB6C1',
  accent: '#FF69B4',
  light: '#FFE4E1',
  lighter: '#FFF0F5',
  text: '#C2185B'
};

export const TOAST_STYLES = {
  success: {
    background: THEME.secondary,
    color: THEME.primary,
    border: `2px solid ${THEME.accent}`,
    borderRadius: '20px',
    fontWeight: 'bold'
  },
  error: {
    background: THEME.light,
    color: '#DC143C',
    border: `2px solid ${THEME.accent}`,
    borderRadius: '20px',
    fontWeight: 'bold'
  }
};

export const QUESTION_TYPES = {
  text: 'text',
  radio: 'radio',
  checkbox: 'checkbox',
  textarea: 'textarea'
};

export const CATEGORIES = {
  stress: 'stress',
  coping: 'coping',
  general: 'general'
};
