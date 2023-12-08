import { REGEX_TO_MATCH_DIGITS_AS_LETTERS } from './constants';
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
