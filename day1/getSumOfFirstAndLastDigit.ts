import {
    DIGITS_AS_LETTERS,
    DigitAsLetter,
    MAP_DIGITS_AS_LETTERS_TO_NUMBER,
} from './constants';

const convertDigitAsLetterToNumber = (digitAsLetter: DigitAsLetter): number =>
    MAP_DIGITS_AS_LETTERS_TO_NUMBER[digitAsLetter];

const convertToNumber = (numberAsString?: string): number | undefined => {
    if (!numberAsString) {
        return undefined;
    }

    if (DIGITS_AS_LETTERS.includes(numberAsString as DigitAsLetter)) {
        return convertDigitAsLetterToNumber(numberAsString as DigitAsLetter);
    }

    return parseInt(numberAsString);
};

export const getSumOfFirstAndLastDigit = (
    line: string,
    regex: RegExp
): number => {
    const numbersInLine = line.match(regex);

    if (!numbersInLine) {
        return 0;
    }

    const firstDigitAsString = convertToNumber(numbersInLine.at(0));
    const lastDigit = convertToNumber(numbersInLine.at(-1));

    const calibrationValueAsString = `${firstDigitAsString}${lastDigit}`;
    const calibrationValue = parseInt(calibrationValueAsString);

    return calibrationValue;
};
