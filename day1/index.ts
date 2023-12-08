// get input.txt file
// for each line, get the first digit and the last digit and put together
// then sum

import * as fsPromise from 'fs/promises';

const getSum = async (): Promise<number> => {
    const file = await fsPromise.open('./day1/input.txt', 'r');

    let total = 0;

    for await (const line of file.readLines()) {
        const numbersInLine = line.match(/\d/g);

        const firstDigit = numbersInLine?.at(0);
        const lastDigit = numbersInLine?.at(-1);

        const calibrationValueAsString = `${firstDigit}${lastDigit}`;
        const calibrationValue = parseInt(calibrationValueAsString);

        total += calibrationValue;
    }

    return total;
};

getSum().then(console.log);
