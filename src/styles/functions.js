import { BASE_FONT_SIZE } from './typography';

export const convertToRem = (px) => {
  return `${px / BASE_FONT_SIZE}rem`;
}