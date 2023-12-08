import { open } from 'fs/promises';
import { getSumOfFirstAndLastDigit } from './getSumOfFirstAndLastDigit';
import {
    REGEX_JUST_NUMBER_DIGITS,
    REGEX_TO_MATCH_DIGITS_AS_LETTERS,
} from './constants';

const INPUT_FILE_PATH = './day1/input.txt';

const getFileAndGetSum = async (filePath: string, regex: RegExp) => {
    const file = await open(filePath, 'r');

    let total = 0;

    for await (const line of file.readLines()) {
        const sumOfLine = getSumOfFirstAndLastDigit(line, regex);

        total += sumOfLine;
    }

    return total;
};

// Part 1
// getFileAndGetSum(INPUT_FILE_PATH, REGEX_JUST_NUMBER_DIGITS).then(
//     (sum: number) => console.log('Part 1 sum:', sum)
// );

// Part 2

getFileAndGetSum(INPUT_FILE_PATH, REGEX_TO_MATCH_DIGITS_AS_LETTERS).then(
    (sum: number) => console.log('Part 2 sum:', sum)
);
