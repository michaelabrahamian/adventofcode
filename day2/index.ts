import { subscribe } from 'diagnostics_channel';
import { readFileSync } from 'fs';

const INPUT_FILE_PATH = 'day2/input.txt';

type Colour = 'red' | 'green' | 'blue';

type Hand = {
    colour: Colour;
    amount: number;
};

type Subset = Array<Hand>;
export type Game = {
    id: number;
    subsets: Array<Subset>;
};

const MAX_COLOURS: Record<Colour, number> = {
    red: 12,
    green: 13,
    blue: 14,
};

const isHandValid = (hand: Hand): boolean =>
    hand.amount <= MAX_COLOURS[hand.colour];

const isSubsetValid = (subset: Subset): boolean => subset.every(isHandValid);

const isGameValid = (game: Game) => game.subsets.every(isSubsetValid);

const GAME_REGEX = /Game (?<id>\d+): (?<subsets>.*)/;
const HAND_REGEX = /(?<amount>\d+) (?<colour>\w+)/;

const getGamesFromFile = (filename: string): Game[] => {
    const fileContents = readFileSync(filename, 'utf8');

    const lines = fileContents.split('\n');

    const mappedGames = lines.map((line): Game => {
        const matches = line.match(GAME_REGEX);

        const gameId = matches?.groups?.id;
        const subsets = matches?.groups?.subsets;

        const mappedSubsets =
            subsets?.split(';').map((subset): Subset => {
                const hands = subset.split(',');

                return hands.map((hand): Hand => {
                    const handRegexMatches = hand.match(
                        /(?<amount>\d+) (?<colour>\w+)/
                    );

                    const colour = handRegexMatches?.groups?.colour;
                    const amount = handRegexMatches?.groups?.amount;

                    if (!colour || !amount) {
                        throw new Error('Invalid hand');
                    }

                    return {
                        colour: colour as Colour,
                        amount: Number(amount),
                    };
                });
            }) ?? [];

        return {
            id: Number(gameId),
            subsets: mappedSubsets,
        };
    });

    return mappedGames;
};

const getSumOfValidGameIds = (): number => {
    const games = getGamesFromFile(INPUT_FILE_PATH);

    const validGames = games.filter(isGameValid);

    const sumOfValidGameIds = validGames.reduce(
        (acc, game) => acc + game.id,
        0
    );

    return sumOfValidGameIds;
};

// Part 1
console.log('Part 1', getSumOfValidGameIds());

// Part 2

type SubsetWithAllColours = {
    red: number;
    green: number;
    blue: number;
};

export const getMinimumSetOfCubesForGame = (
    game: Game
): SubsetWithAllColours => {
    const smallestSubset: SubsetWithAllColours = {
        red: 0,
        green: 0,
        blue: 0,
    };

    game.subsets.forEach((subset) => {
        subset.forEach((hand) => {
            if (hand.amount > smallestSubset[hand.colour]) {
                smallestSubset[hand.colour] = hand.amount;
            }
        });
    });

    return smallestSubset;
};

const getPowerOfSetOfCubes = (setOfCubes: SubsetWithAllColours): number =>
    setOfCubes.blue * setOfCubes.green * setOfCubes.red;

const getSumOfPowerOfMinimumSetOfCubes = (): number => {
    const games = getGamesFromFile(INPUT_FILE_PATH);

    return games.reduce((acc, game) => {
        const minimumSetOfCubes = getMinimumSetOfCubesForGame(game);

        return acc + getPowerOfSetOfCubes(minimumSetOfCubes);
    }, 0);
};

console.log('Part 2:', getSumOfPowerOfMinimumSetOfCubes());
