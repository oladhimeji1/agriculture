export const colors = {
  // Brand Colors
  primary: '#35a35dff', // Bright green from UI
  primaryDark: '#00CC00',
  primaryLight: '#a7f1a774',

  // Neutrals
  black: '#000000',
  white: '#FFFFFF',
  gray900: '#1A1A1A',
  gray800: '#2D2D2D',
  gray700: '#4D4D4D',
  gray600: '#6B6B6B',
  gray500: '#9B9B9B',
  gray400: '#B8B8B8',
  gray300: '#D4D4D4',
  gray200: '#E8E8E8',
  gray100: '#F5F5F5',

  // Status Colors
  success: '#35a35dff',
  successLight: '#E6FFE6',
  error: '#FF4444',
  errorLight: '#FFE6E6',
  warning: '#FF9500',
  warningLight: '#FFF3E6',
  info: '#007AFF',
  infoLight: '#E6F3FF',

  // Backgrounds
  background: '#F8F9FA',
  surface: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Border
  border: '#E8E8E8',
  borderLight: '#F0F0F0',

  // Text
  textPrimary: '#000000',
  textSecondary: '#6B6B6B',
  textTertiary: '#9B9B9B',
  textDisabled: '#D4D4D4',
  textOnPrimary: '#000000',

  // Input
  inputBackground: '#FFFFFF',
  inputBorder: '#E8E8E8',
  inputPlaceholder: '#B8B8B8',
  inputFocusBorder: '#00FF00',

  // Icons
  iconActive: '#00FF00',
  iconInactive: '#9B9B9B',
} as const;

export type ColorKey = keyof typeof colors;
