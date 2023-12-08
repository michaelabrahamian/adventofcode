import {
    REGEX_JUST_NUMBER_DIGITS,
    REGEX_TO_MATCH_DIGITS_AS_LETTERS,
} from './constants';
import { getSumOfFirstAndLastDigit } from './getSumOfFirstAndLastDigit';

test('should work with only numbers', () => {
    expect(getSumOfFirstAndLastDigit('123', /\d/g)).toBe(13);
});

test('should work with only letters', () => {
    expect(
        getSumOfFirstAndLastDigit(
            'onetwothree',
            REGEX_TO_MATCH_DIGITS_AS_LETTERS
        )
    ).toBe(13);
});

test('should work with a mixture of numbers and letters', () => {
    expect(
        getSumOfFirstAndLastDigit(
            '1two3four5six7eight',
            REGEX_TO_MATCH_DIGITS_AS_LETTERS
        )
    ).toBe(18);
});

test('should work with one letter digit', () => {
    expect(
        getSumOfFirstAndLastDigit('one', REGEX_TO_MATCH_DIGITS_AS_LETTERS)
    ).toBe(11);
});

describe('part 1 test cases', () => {
    test.each([
        {
            line: '1abc2',
            value: 12,
        },
        {
            line: 'pqr3stu8vwx',
            value: 38,
        },
        {
            line: 'a1b2c3d4e5f',
            value: 15,
        },
        {
            line: 'treb7uchet',
            value: 77,
        },
    ])('line %o.line should return %i', ({ line, value }) => {
        expect(getSumOfFirstAndLastDigit(line, REGEX_JUST_NUMBER_DIGITS)).toBe(
            value
        );
    });
});

describe('part 2 test cases', () => {
    test.each([
        {
            line: 'two1nine',
            value: 29,
        },
        {
            line: 'eightwothree',
            value: 83,
        },
        {
            line: 'abcone2threexyz',
            value: 13,
        },
        {
            line: 'xtwone3four',
            value: 24,
        },
        {
            line: '4nineeightseven2',
            value: 42,
        },
        {
            line: 'zoneight234',
            value: 14,
        },
        {
            line: '7pqrstsixteen',
            value: 76,
        },
    ])('line %o.line should return %i', ({ line, value }) => {
        expect(
            getSumOfFirstAndLastDigit(line, REGEX_TO_MATCH_DIGITS_AS_LETTERS)
        ).toBe(value);
    });
});
