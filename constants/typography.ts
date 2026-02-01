import { TextStyle } from 'react-native';

export const typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    fontFamily: 'Inter_700Bold',
  } as TextStyle,

  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    fontFamily: 'Inter_700Bold',
  } as TextStyle,

  h3: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    fontFamily: 'Inter_700Bold',
  } as TextStyle,

  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  h5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  h6: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  // Body
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 26,
    fontFamily: 'Inter_400Regular',
  } as TextStyle,

  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  } as TextStyle,

  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  } as TextStyle,

  // Labels
  label: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  labelSmall: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  // Caption
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Inter_400Regular',
  } as TextStyle,

  captionSmall: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: 'Inter_400Regular',
  } as TextStyle,

  // Button
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  buttonSmall: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,
} as const;

export type TypographyKey = keyof typeof typography;
