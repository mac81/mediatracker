import {convertToRem} from './functions';

const FONT_FAMILY_HEADER = 'Source Sans Pro';
const FONT_FAMILY_BODY = 'Open Sans';
export const BASE_FONT_SIZE = 12;

const FONT_WEIGHTS = {
  THIN: 100,
  LIGHT: 300,
  REGULAR: 400,
  SEMI_BOLD: 600,
  BOLD: 700,
};

export const typography = {
  fontSize: {
    display4: convertToRem(112),
    display3: convertToRem(56),
    display2: convertToRem(45),
    display1: convertToRem(34),
    headline: convertToRem(24),
    title: convertToRem(20),
    body2: convertToRem(13),
    body1: convertToRem(13),
    button: convertToRem(14),
  },
  fontWeight: {
    display4: FONT_WEIGHTS.THIN,
    display3: FONT_WEIGHTS.LIGHT,
    display2: FONT_WEIGHTS.LIGHT,
    display1: FONT_WEIGHTS.LIGHT,
    headline: FONT_WEIGHTS.LIGHT,
    title: FONT_WEIGHTS.REGULAR,
    body2: FONT_WEIGHTS.REGULAR,
    body1: FONT_WEIGHTS.LIGHT,
    button: FONT_WEIGHTS.REGULAR,
  },
  lineHeight: {
    display4: convertToRem(128),
    display3: convertToRem(84),
    display2: convertToRem(48),
    display1: convertToRem(40),
    headline: convertToRem(32),
    title: convertToRem(28),
    body2: convertToRem(24),
    body1: convertToRem(20),
    button: convertToRem(20),
  },
  letterSpacing: {
    display4: -0.1,
    display3: -0.05,
    display2: 0,
    display1: 0,
    headline: 0,
    title: 0.05,
    body2: 0.1,
    body1: 0.1,
    button: 0.1,
  },
  color: {
    display4: 0.87,
    title: 0.87,
  },
};

export const font = style => `
  font-family: ${FONT_FAMILY_HEADER}; 
  font-weight: ${typography.fontWeight[style]}; 
  font-size: ${typography.fontSize[style]};
  line-height: ${typography.lineHeight[style]};
  letter-spacing: ${typography.letterSpacing[style]};
`;

export const color = (color, style) => `
  color: rgba(${color}, ${typography.color[style]});
`;
