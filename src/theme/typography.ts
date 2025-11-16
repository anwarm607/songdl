export interface TypographyStyle {
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700' | '800';
  lineHeight?: number;
  letterSpacing?: number;
}

/**
 * Typography Scales
 *
 * - Display: Large headers (40pt+)
 * - Headline: Large section headers (24-28pt)
 * - Title: Card titles (16-18pt)
 * - Body: Regular text (14-16pt)
 * - Caption: Small text (12-13pt)
 */
export const typography = {
  // Display - Large headers
  displayLarge: {
    fontSize: 48,
    fontWeight: '700' as const,
    lineHeight: 56,
  } as TypographyStyle,

  displayMedium: {
    fontSize: 40,
    fontWeight: '700' as const,
    lineHeight: 48,
  } as TypographyStyle,

  // Headline - Large section headers
  headlineLarge: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  } as TypographyStyle,

  headlineMedium: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  } as TypographyStyle,

  // Title - Card and section titles
  titleLarge: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  } as TypographyStyle,

  titleMedium: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  } as TypographyStyle,

  titleSmall: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  } as TypographyStyle,

  // Body - Main content text
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  } as TypographyStyle,

  bodyMedium: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  } as TypographyStyle,

  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  } as TypographyStyle,

  // Label - Small interactive text
  labelLarge: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  } as TypographyStyle,

  labelMedium: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  } as TypographyStyle,

  labelSmall: {
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 14,
  } as TypographyStyle,

  // Caption - Smallest text
  captionLarge: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  } as TypographyStyle,

  captionSmall: {
    fontSize: 10,
    fontWeight: '400' as const,
    lineHeight: 14,
  } as TypographyStyle,

  // Navigation header
  navHeader: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  } as TypographyStyle,
} as const;

export type TypographyKey = keyof typeof typography;