export type DigitAsLetter =
    | 'one'
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
    | 'nine';

export const DIGITS_AS_LETTERS: Array<DigitAsLetter> = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];

export const MAP_DIGITS_AS_LETTERS_TO_NUMBER: Record<DigitAsLetter, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

export const REGEX_JUST_NUMBER_DIGITS = /\d/g;

export const REGEX_TO_MATCH_DIGITS_AS_LETTERS = new RegExp(
    `${DIGITS_AS_LETTERS.join('|')}|\\d`,
    'g'
);
